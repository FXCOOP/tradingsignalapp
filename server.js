import { createServer } from 'http';
import next from 'next';
import cron from 'node-cron';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

async function setupDatabase() {
  if (process.env.NODE_ENV === 'production') {
    console.log('🔧 Setting up production database...');

    // Check if DATABASE_URL is present
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL not found in environment variables');
      return;
    }

    try {
      // Deploy migrations
      console.log('Running database migrations...');
      await execAsync('npx prisma migrate deploy');
      console.log('✅ Database migrations applied');

      // Seed database if empty
      try {
        console.log('Attempting to seed database...');
        await execAsync('npm run db:seed');
        console.log('✅ Database seeded successfully');
      } catch (seedError) {
        console.log('ℹ️ Database seeding skipped (likely already seeded):', seedError.message);
      }
    } catch (error) {
      console.error('❌ Database setup failed:', error.message);
      // Don't exit process, continue with server startup
    }
  }
}

async function startServer() {
  try {
    await app.prepare();

    // Setup database on production startup
    await setupDatabase();

    // Schedule daily signal generation (only in production)
    if (process.env.NODE_ENV === 'production') {
      cron.schedule('0 8 * * *', async () => {
        try {
          const { runDailyJob } = await import('./scripts/daily.js');
          await runDailyJob();
          console.log('✅ Daily signal generation completed');
        } catch (e) {
          console.error('❌ Daily job error:', e);
        }
      });
    }

    const port = process.env.PORT || 3000;
    createServer((req, res) => handle(req, res)).listen(port, (err) => {
      if (err) throw err;
      console.log(`🚀 PK Signal Pulse ready on http://localhost:${port}`);
    });

  } catch (error) {
    console.error('💥 Server startup failed:', error);
    process.exit(1);
  }
}

startServer();
/**
 * Cron Job - Send Scheduled Emails
 * Runs every 5 minutes via Vercel Cron
 *
 * Endpoint: /api/cron/send-emails
 * Method: GET
 * Auth: Bearer token (CRON_SECRET)
 */

import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email-service-resend';

// Create Supabase client with service role key (server-side only)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = request.headers.get('authorization');
    const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;

    if (authHeader !== expectedAuth) {
      console.error('❌ Unauthorized cron request');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('🔄 Starting email cron job...');

    // Get emails that are due to be sent
    const { data: emails, error: fetchError } = await supabase
      .from('email_queue')
      .select(`
        *,
        users:user_id (
          id,
          email,
          full_name,
          unsubscribed
        )
      `)
      .lte('scheduled_for', new Date().toISOString())
      .eq('sent', false)
      .limit(50); // Process 50 emails at a time

    if (fetchError) {
      console.error('❌ Error fetching emails:', fetchError);
      throw fetchError;
    }

    if (!emails || emails.length === 0) {
      console.log('✅ No emails to send');
      return NextResponse.json({
        message: 'No emails to send',
        count: 0,
      });
    }

    console.log(`📧 Found ${emails.length} emails to send`);

    // Process each email
    const results = await Promise.allSettled(
      emails.map(async (emailRecord) => {
        const user = emailRecord.users as any;

        // Skip if user unsubscribed
        if (user.unsubscribed) {
          console.log(`⏭️  Skipping ${user.email} - unsubscribed`);

          await supabase
            .from('email_queue')
            .update({
              sent: true,
              error: 'User unsubscribed',
            })
            .eq('id', emailRecord.id);

          return { skipped: true, reason: 'unsubscribed' };
        }

        // Send email
        const result = await sendEmail(
          {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
          },
          emailRecord.email_type as 'welcome' | 'day1' | 'week1'
        );

        // Update email_queue with sent status
        await supabase
          .from('email_queue')
          .update({
            sent: result.success,
            sent_at: result.success ? new Date().toISOString() : null,
            error: result.error || null,
            retry_count: emailRecord.retry_count + 1,
          })
          .eq('id', emailRecord.id);

        // Log to email_logs
        await supabase.from('email_logs').insert({
          user_id: user.id,
          email_type: emailRecord.email_type,
          status: result.success ? 'sent' : 'failed',
          message_id: result.messageId || null,
          error: result.error || null,
          metadata: {
            retry_count: emailRecord.retry_count,
          },
        });

        // Update user tracking columns if email was sent successfully
        if (result.success) {
          const updateData: any = {};

          if (emailRecord.email_type === 'welcome') {
            updateData.welcome_email_sent = true;
            updateData.welcome_email_sent_at = new Date().toISOString();
          } else if (emailRecord.email_type === 'day1') {
            updateData.day1_email_sent = true;
            updateData.day1_email_sent_at = new Date().toISOString();
          } else if (emailRecord.email_type === 'week1') {
            updateData.week1_email_sent = true;
            updateData.week1_email_sent_at = new Date().toISOString();
          }

          await supabase
            .from('users')
            .update(updateData)
            .eq('id', user.id);
        }

        return {
          success: result.success,
          email: user.email,
          type: emailRecord.email_type,
        };
      })
    );

    // Calculate summary
    const summary = {
      total: results.length,
      sent: results.filter(
        (r) => r.status === 'fulfilled' && (r.value as any).success === true
      ).length,
      failed: results.filter((r) => r.status === 'rejected').length,
      skipped: results.filter(
        (r) => r.status === 'fulfilled' && (r.value as any).skipped === true
      ).length,
    };

    console.log('✅ Email cron job complete', summary);

    return NextResponse.json({
      message: 'Email processing complete',
      summary,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('❌ Cron job error:', error);

    return NextResponse.json(
      {
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Disable body parsing (not needed for GET request)
export const dynamic = 'force-dynamic';

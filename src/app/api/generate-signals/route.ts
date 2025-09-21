import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateDailySignals, translateToUrdu } from '@/lib/openai';
import { generateSlug } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    // Check if user is authorized (you might want to add authentication here)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Generate signals using OpenAI
    const generatedContent = await generateDailySignals();

    // Create English article first
    const englishSlug = generateSlug(generatedContent.title);

    // Check if user exists, create a default one if not
    let user = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'admin@finsignals.com',
          name: 'FinSignals Admin',
          role: 'ADMIN'
        }
      });
    }

    const englishArticle = await prisma.article.create({
      data: {
        slug: englishSlug,
        lang: 'EN',
        title: generatedContent.title,
        excerpt: generatedContent.excerpt,
        content: generatedContent.content,
        status: 'PENDING',
        authorId: user.id,
        signals: {
          create: generatedContent.signals.map(signal => ({
            instrument: signal.instrument,
            class: signal.class,
            bias: signal.bias,
            entry: signal.entry,
            stopLoss: signal.stopLoss,
            takeProfit1: signal.takeProfit1,
            takeProfit2: signal.takeProfit2,
            timeframe: signal.timeframe,
            confidence: signal.confidence,
          }))
        },
        sources: {
          create: generatedContent.sources.map(source => ({
            title: source.title,
            url: source.url,
          }))
        }
      },
      include: {
        signals: true,
        sources: true,
      }
    });

    // Translate to Urdu
    const urduContent = await translateToUrdu(generatedContent.content);
    const urduTitle = generatedContent.title; // You might want to translate this too
    const urduExcerpt = generatedContent.excerpt; // You might want to translate this too

    const urduSlug = generateSlug(urduTitle + '-ur');

    const urduArticle = await prisma.article.create({
      data: {
        slug: urduSlug,
        lang: 'UR',
        title: urduTitle,
        excerpt: urduExcerpt,
        content: urduContent,
        status: 'PENDING',
        authorId: user.id,
        signals: {
          create: generatedContent.signals.map(signal => ({
            instrument: signal.instrument,
            class: signal.class,
            bias: signal.bias,
            entry: signal.entry,
            stopLoss: signal.stopLoss,
            takeProfit1: signal.takeProfit1,
            takeProfit2: signal.takeProfit2,
            timeframe: signal.timeframe,
            confidence: signal.confidence,
          }))
        },
        sources: {
          create: generatedContent.sources.map(source => ({
            title: source.title,
            url: source.url,
          }))
        }
      },
      include: {
        signals: true,
        sources: true,
      }
    });

    return NextResponse.json({
      success: true,
      englishArticle: {
        id: englishArticle.id,
        slug: englishArticle.slug,
        title: englishArticle.title,
        signalsCount: englishArticle.signals.length,
      },
      urduArticle: {
        id: urduArticle.id,
        slug: urduArticle.slug,
        title: urduArticle.title,
        signalsCount: urduArticle.signals.length,
      }
    });

  } catch (error) {
    console.error('Error generating signals:', error);
    return NextResponse.json(
      { error: 'Failed to generate signals' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Signal generation endpoint',
    usage: 'POST to this endpoint with Authorization header to generate daily signals'
  });
}
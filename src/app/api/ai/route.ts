import { NextRequest, NextResponse } from 'next/server';
import { openai, GPT_MODEL } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { prompt, messages } = await request.json();

    // Check if user is authorized
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let response;

    if (messages) {
      // Use chat completions for conversational AI
      response = await openai.chat.completions.create({
        model: GPT_MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      });

      const text = response.choices[0]?.message?.content || 'No response generated';

      return NextResponse.json({
        text,
        model: GPT_MODEL,
        usage: response.usage
      });
    } else if (prompt) {
      // Simple prompt completion
      response = await openai.chat.completions.create({
        model: GPT_MODEL,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const text = response.choices[0]?.message?.content || 'No response generated';

      return NextResponse.json({
        text,
        model: GPT_MODEL,
        usage: response.usage
      });
    } else {
      return NextResponse.json({ error: 'Missing prompt or messages' }, { status: 400 });
    }

  } catch (error) {
    console.error('AI API Error:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'AI service error', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Chat API',
    model: GPT_MODEL,
    usage: {
      prompt: 'POST with { "prompt": "Your question" }',
      chat: 'POST with { "messages": [{"role": "user", "content": "Hello"}] }'
    },
    note: 'Requires Authorization: Bearer <token>'
  });
}
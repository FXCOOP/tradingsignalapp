/**
 * Unsubscribe Endpoint
 * Allows users to unsubscribe from marketing emails
 *
 * Endpoint: /api/unsubscribe?email=user@example.com
 * Method: GET
 */

import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    console.log(`🚫 Unsubscribe request for: ${email}`);

    // Call Supabase function to unsubscribe user
    const { data, error } = await supabase.rpc('unsubscribe_user', {
      user_email: email,
    });

    if (error) {
      console.error('❌ Unsubscribe error:', error);
      throw error;
    }

    console.log(`✅ User unsubscribed: ${email}`);

    // Return HTML page
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Unsubscribed - TradeFlow</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
            }
            .container {
              background: white;
              max-width: 500px;
              width: 100%;
              padding: 50px 40px;
              border-radius: 20px;
              box-shadow: 0 20px 60px rgba(0,0,0,0.3);
              text-align: center;
            }
            .icon {
              font-size: 64px;
              margin-bottom: 20px;
            }
            h1 {
              color: #4285f4;
              font-size: 32px;
              margin-bottom: 20px;
            }
            p {
              color: #666;
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: 15px;
            }
            .email {
              background: #f5f5f5;
              padding: 10px 20px;
              border-radius: 8px;
              font-weight: 600;
              color: #333;
              margin: 25px 0;
            }
            .button {
              display: inline-block;
              background: #4285f4;
              color: white;
              padding: 14px 32px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              margin-top: 25px;
              transition: background 0.3s;
            }
            .button:hover {
              background: #3367d6;
            }
            .footer {
              margin-top: 30px;
              color: #999;
              font-size: 13px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="icon">✅</div>
            <h1>You've Been Unsubscribed</h1>
            <p>You will no longer receive marketing emails from TradeFlow.</p>
            <div class="email">${email}</div>
            <p>We're sorry to see you go! If you change your mind, you can re-subscribe anytime from your account settings.</p>
            <a href="https://tradeflow.cloud" class="button">Return to TradeFlow</a>
            <div class="footer">
              <p>© 2025 TradeFlow. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
      `,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  } catch (error: any) {
    console.error('❌ Unsubscribe endpoint error:', error);

    // Return error HTML page
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Error - TradeFlow</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background: #f5f5f5;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              padding: 20px;
            }
            .container {
              background: white;
              max-width: 500px;
              padding: 40px;
              border-radius: 10px;
              text-align: center;
            }
            h1 { color: #dc3545; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>❌ Error</h1>
            <p>Sorry, there was an error processing your unsubscribe request.</p>
            <p>Please contact support@tradeflow.cloud for assistance.</p>
          </div>
        </body>
      </html>
      `,
      {
        status: 500,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  }
}

export const dynamic = 'force-dynamic';

/**
 * API Endpoint: GET /api/allcrypto/goal-types
 *
 * Fetches goal types from AllCrypto API
 * Returns list of available goal types (Lead, FTD, etc.)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createAllCryptoClient } from '@/lib/allcrypto-api';

export async function GET(request: NextRequest) {
  try {
    const client = createAllCryptoClient();
    const result = await client.getGoalTypes();

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 500 }
      );
    }

    console.log('AllCrypto goal types fetched:', {
      count: result.goalTypes?.length || 0,
      goalTypes: result.goalTypes,
    });

    return NextResponse.json({
      success: true,
      goalTypes: result.goalTypes,
    });

  } catch (error) {
    console.error('AllCrypto goal-types API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

/**
 * API Endpoint: GET /api/allcrypto/get-status
 *
 * Fetches lead status from AllCrypto API
 * Can retrieve by lead UUID or get recent leads
 */

import { NextRequest, NextResponse } from 'next/server';
import { createAllCryptoClient } from '@/lib/allcrypto-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const leadUuid = searchParams.get('lead_uuid');
    const createdFrom = searchParams.get('created_from');
    const createdTo = searchParams.get('created_to');
    const page = searchParams.get('page');
    const perPage = searchParams.get('per_page');
    const goalTypeUuid = searchParams.get('goal_type_uuid');
    const isTest = searchParams.get('is_test');

    const client = createAllCryptoClient();

    // If lead UUID is provided, get specific lead status
    if (leadUuid) {
      const result = await client.getLeadStatus(leadUuid);

      if (!result.success) {
        return NextResponse.json(
          {
            success: false,
            error: result.error,
          },
          { status: 404 }
        );
      }

      console.log('AllCrypto lead status fetched:', {
        uuid: result.lead?.uuid,
        email: result.lead?.email,
        status: result.lead?.goalType,
      });

      return NextResponse.json({
        success: true,
        lead: result.lead,
      });
    }

    // Otherwise, get leads with filters
    const result = await client.getLeads({
      created_from: createdFrom || undefined,
      created_to: createdTo || undefined,
      page: page ? parseInt(page) : undefined,
      per_page: perPage ? parseInt(perPage) : undefined,
      goal_type_uuid: goalTypeUuid || undefined,
      is_test: isTest === 'true' ? true : isTest === 'false' ? false : undefined,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 500 }
      );
    }

    console.log('AllCrypto leads fetched:', {
      count: result.leads?.length || 0,
    });

    return NextResponse.json({
      success: true,
      leads: result.leads,
      count: result.leads?.length || 0,
    });

  } catch (error) {
    console.error('AllCrypto get-status API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

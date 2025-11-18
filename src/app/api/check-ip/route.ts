import { NextResponse } from 'next/server';

/**
 * Diagnostic endpoint to check server's outbound IP address
 * GET /api/check-ip
 */
export async function GET() {
  try {
    // Check outbound IP by calling external service
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();

    return NextResponse.json({
      success: true,
      outboundIP: ipData.ip,
      message: 'This is the IP address your server uses for outbound API calls',
      note: 'This IP must be whitelisted with AllCrypto'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to check IP'
    }, { status: 500 });
  }
}

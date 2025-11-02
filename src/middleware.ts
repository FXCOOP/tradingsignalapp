import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to protect CRM routes with basic authentication
 */
export function middleware(request: NextRequest) {
  // Only protect /crm routes
  if (request.nextUrl.pathname.startsWith('/crm')) {
    // Get credentials from environment variables
    const CRM_USERNAME = process.env.CRM_USERNAME || 'admin';
    const CRM_PASSWORD = process.env.CRM_PASSWORD || 'crm2025';

    // Check for Authorization header
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="CRM Access"',
        },
      });
    }

    // Parse Basic Auth header
    const auth = authHeader.split(' ')[1];
    const [username, password] = Buffer.from(auth, 'base64').toString().split(':');

    // Validate credentials
    if (username !== CRM_USERNAME || password !== CRM_PASSWORD) {
      return new NextResponse('Invalid credentials', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="CRM Access"',
        },
      });
    }

    // Credentials valid, allow access
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/crm/:path*',
};
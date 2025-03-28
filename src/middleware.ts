import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);
  
  // Add the current path to the x-url header
  requestHeaders.set('x-url', request.nextUrl.pathname);
  
  // Return the response with the modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};

import { NextResponse, type NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.nextUrl.pathname);
  
  // Check for existing session ID cookie
  let sessionId = request.cookies.get('session-id')?.value;
  if (!sessionId) {
    sessionId = uuidv4();
  }
  
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const adminCookie = request.cookies.get('admin')?.value;
    
    // If no admin cookie is present, redirect to login page
    if (!adminCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Create response object
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  
  // Set or update the session cookie
  // httpOnly: true prevents JavaScript access (more secure)
  // secure: process.env.NODE_ENV === 'production' ensures HTTPS is used in production
  // maxAge: 30 days in seconds
  response.cookies.set('session-id', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  });
  
  return response;
}

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

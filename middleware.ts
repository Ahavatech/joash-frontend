import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


function isAuthenticated(request: NextRequest) {
  const token = request.cookies.get('token');
  return !!token;
}

export function middleware(request: NextRequest) {
  // Protect /admin/dashboard route
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    if (!isAuthenticated(request)) {
      // Redirect to /admin login page
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard'],
};

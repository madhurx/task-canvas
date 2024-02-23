import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import React from 'react';

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get('authToken')?.value;

    const tokenData = jwtDecode(authToken as string);

    const notAccessibleLoginPath =
        request.nextUrl.pathname === '/sign-in' ||
        request.nextUrl.pathname === '/sign-up';

    if (notAccessibleLoginPath) {
        //accessing authPages if logged in
        if (authToken) {
            return NextResponse.redirect(new URL('/profile', request.url));
        }
    } else {
        //accessing normal pages if not logged in
        if (!authToken) {
            return NextResponse.redirect(new URL('/sign-in', request.url));
        }
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/sign-in',
        '/sign-up',
        '/profile',
        '/tasks',
        '/tasks/:path*',
        '/create-task',
    ],
};

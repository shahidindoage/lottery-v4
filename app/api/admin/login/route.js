import { NextResponse } from 'next/server';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '12345';

export async function POST(req) {
  const { username, password } = await req.json();

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const res = NextResponse.json({ success: true });

    // Set cookie for admin session
    res.cookies.set('admin_auth', 'true', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 2, // 2 hours
    });

    return res;
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}

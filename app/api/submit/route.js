import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, terms, privacy } = body;

    if (!name || !terms || !privacy) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ✅ Find the last entry to determine next uniqueId
    const lastEntry = await prisma.lotterySubmission.findFirst({
      orderBy: { id: 'desc' },
      select: { uniqueId: true },
    });

    let nextIdNumber = 100; // default start
    if (lastEntry && !isNaN(parseInt(lastEntry.uniqueId))) {
      nextIdNumber = parseInt(lastEntry.uniqueId) + 1;
    }

    const nextUniqueId = nextIdNumber.toString().padStart(3, '0');

    // ✅ Create new record
    const newEntry = await prisma.lotterySubmission.create({
      data: {
        uniqueId: nextUniqueId,
        name,
        phone,
        accepted_terms: terms,
        accepted_privacy: privacy,
        winner: 0,
        prize: null,
      },
    });

    const res = NextResponse.json({ success: true, uniqueId: newEntry.uniqueId });
    res.cookies.set('lottery_user', newEntry.uniqueId, {
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 20,
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Reset all winners in DB
    await prisma.lotterySubmission.updateMany({
      where: { winner: 1 },
      data: { winner: 0, prize: null }
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'DB reset error' }, { status: 500 });
  }
}

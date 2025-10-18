// /app/api/assign-winner/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { uniqueId, prize } = await req.json(); // ✅ use uniqueId
  try {
    const updatedUser = await prisma.lotterySubmission.update({
      where: { uniqueId }, // ✅ update by uniqueId
      data: { winner: 1, prize }
    });
    return NextResponse.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}

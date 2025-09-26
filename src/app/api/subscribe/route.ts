import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { sendMagicLink } from '../../../lib/email';
import { createMagicToken } from '../../../lib/magic';

export async function POST(req: NextRequest){
  const { email } = await req.json();
  if (!email || !String(email).includes('@')) return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  await prisma.subscriber.upsert({ where: { email }, update: {}, create: { email } });
  const token = await createMagicToken(email);
  await sendMagicLink(email, token);
  return NextResponse.json({ message: 'Check your email for the magic link (valid 7 days).' });
}
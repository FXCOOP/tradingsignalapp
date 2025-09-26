import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  if (!token) return NextResponse.redirect(new URL('/', req.url));
  const row = await prisma.magicToken.findUnique({ where: { token } });
  if (!row || row.used || row.expiresAt < new Date()) return NextResponse.redirect(new URL('/', req.url));
  await prisma.magicToken.update({ where: { token }, data: { used: true } });
  await prisma.subscriber.update({ where: { email: row.email }, data: { lastLoginAt: new Date(), isActive: true } });
  cookies().set('pksub', row.email, { httpOnly: true, sameSite: 'lax', maxAge: 60*60*24*7 });
  return NextResponse.redirect(new URL('/en/signals', req.url));
}
import { prisma } from './db';
import crypto from 'node:crypto';

export async function createMagicToken(email: string){
  const token = crypto.randomBytes(24).toString('hex');
  const expires = new Date(Date.now() + 7*24*60*60*1000);
  await prisma.magicToken.create({ data: { email, token, expiresAt: expires } });
  return token;
}
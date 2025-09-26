import { prisma } from './db';

export async function getLatestSignals(n=4){
  return prisma.signal.findMany({ orderBy: { date: 'desc' }, take: n });
}
export async function listSignals(page=1, pageSize=20){
  return prisma.signal.findMany({ orderBy: { date: 'desc' }, skip: (page-1)*pageSize, take: pageSize });
}
export async function listAllSignals(){
  return prisma.signal.findMany({ orderBy: { date: 'desc' } });
}
export async function findSignalBySlug(slug: string){
  return prisma.signal.findUnique({ where: { slug } });
}
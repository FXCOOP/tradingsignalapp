import { NextResponse } from 'next/server';
import { runDailyJob } from '@scripts/daily';

export async function POST(){
  try {
    const res = await runDailyJob();
    return NextResponse.json({ ok: true, created: res.created });
  } catch (e:any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
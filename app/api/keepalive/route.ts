import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function GET() {
  await redis.ping();
  return NextResponse.json({ ok: true });
}

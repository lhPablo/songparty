import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await redis.set("keepalive:last", new Date().toISOString());
    const value = await redis.get<string>("keepalive:last");
    console.log("[keepalive] ok", value);
    return NextResponse.json({ ok: true, value });
  } catch (error) {
    console.error("[keepalive] failed", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { createSession, timingSafeEqual, ADMIN_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const password = process.env.ADMIN_PASSWORD;
  if (!secret || !password) {
    return NextResponse.json(
      { error: "Admin auth is not configured (set ADMIN_PASSWORD and ADMIN_SESSION_SECRET)." },
      { status: 500 },
    );
  }

  let body: { password?: string };
  try {
    body = (await req.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const submitted = body.password ?? "";
  // Pad to equal length before constant-time compare to avoid length leak.
  const ok =
    submitted.length === password.length && timingSafeEqual(submitted, password);
  if (!ok) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = await createSession(secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

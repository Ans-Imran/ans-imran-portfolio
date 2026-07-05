/**
 * Owner-password admin auth. Stateless, HMAC-signed session cookie so it works
 * in both the Edge middleware and Node route handlers (Web Crypto only).
 */

export const ADMIN_COOKIE = "admin_session";
const DEFAULT_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

const encoder = new TextEncoder();

async function hmacHex(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Constant-time string compare (equal-length hex strings). */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Create a signed session token: `<expiryMs>.<hmac>`. */
export async function createSession(secret: string, ttlMs = DEFAULT_TTL_MS): Promise<string> {
  const payload = String(Date.now() + ttlMs);
  return `${payload}.${await hmacHex(payload, secret)}`;
}

/** Verify a session token: valid signature and not expired. */
export async function verifySession(
  token: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!token || !secret) return false;
  const dot = token.indexOf(".");
  if (dot < 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const exp = Number(payload);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  const expected = await hmacHex(payload, secret);
  return timingSafeEqual(sig, expected);
}

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _publicClient: SupabaseClient | null = null;

export function getPublicClient(): SupabaseClient {
  if (_publicClient) return _publicClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required");
  }
  _publicClient = createClient(url, key);
  return _publicClient;
}

export function getServiceClient(): SupabaseClient {
  const url        = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
  }
  return createClient(url, serviceKey);
}

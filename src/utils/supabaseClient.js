import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';

let supabaseClient = null;

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createBrowserSupabaseClient();
  }
  return supabaseClient;
};
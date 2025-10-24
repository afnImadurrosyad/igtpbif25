import { createClient } from "@supabase/supabase-js";

// Singleton pattern - only create one instance
let supabaseInstance = null;

const getSupabaseInstance = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storage:
            typeof window !== "undefined" ? window.localStorage : undefined,
        },
      }
    );
  }
  return supabaseInstance;
};

// Export the same instance for all uses
export const supabase = getSupabaseInstance();

// Deprecated: Use supabase directly instead
export const getSupabaseClient = () => {
  return getSupabaseInstance();
};

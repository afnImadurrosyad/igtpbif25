import { createClient } from "@supabase/supabase-js";

// Singleton pattern - only create one instance
let supabaseInstance = null;

const getSupabaseInstance = () => {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Missing Supabase environment variables");
      throw new Error("Supabase configuration is missing");
    }

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage:
          typeof window !== "undefined" ? window.localStorage : undefined,
        flowType: "pkce",
      },
      global: {
        headers: {
          "x-application-name": "igttpb-2025",
        },
      },
      db: {
        schema: "public",
      },
      // Add retry logic for network issues
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    });
  }
  return supabaseInstance;
};

// Export the same instance for all uses
export const supabase = getSupabaseInstance();

// Helper function to check connection
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from("dataif25")
      .select("count")
      .limit(1);
    return !error;
  } catch (error) {
    console.error("Supabase connection check failed:", error);
    return false;
  }
};

// Deprecated: Use supabase directly instead
export const getSupabaseClient = () => {
  return getSupabaseInstance();
};

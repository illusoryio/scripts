// Client + Supa JWT v1

async function supaClerk(token) {
  try {
    let supabaseClient = null;
    const { createClient } = supabase;
    supabaseClient = createClient(
      "https://supa.illusory.io",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cWxvYndqd2Jib3VzZ2Rod3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY1ODk4ODYsImV4cCI6MTk5MjE2NTg4Nn0.nla93WMcf1pNyFXZ5_1sniMD97CYj8y9lF5zKif2TrI",
      {
        global: {
          headers: { Authorization: `Bearer ${token}` },
        },
      }
    );
    return supabaseClient;
  } catch (err) {
    console.error(err);
  }
}

// Get Supa Token v1

async function supaToken() {
  try {
    const supabaseAccessToken = await window.Clerk.session.getToken({
      template: "supabase-auth",
    });
    console.log("supa access token created...");
    return supabaseAccessToken;
  } catch (err) {
    console.error(err);
  }
}

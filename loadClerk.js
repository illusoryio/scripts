// Load Clerk v1

async function loadClerk(action) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get this URL from the Clerk Dashboard
      const frontendApi = "clerk.a7i81.ec7ck.lcl.dev";
      const version = "@latest"; // Set to appropriate version

      // Creates asyncronous script
      const script = document.createElement("script");
      script.setAttribute("data-clerk-frontend-api", frontendApi);
      script.async = true;
      script.src = `https://${frontendApi}/npm/@clerk/clerk-js${version}/dist/clerk.browser.js`;

      // Adds listener to initialize ClerkJS after it's loaded
      script.addEventListener("load", async function () {
        await window.Clerk.load({
          // Set load options here...
        });
        console.log("Clerk loaded 🔒");
        clerkActions(action);
      });
      const doc = document.body.appendChild(script);
      console.log("Script called");
      resolve();
    }, 200);
  });
}

// Base URL for assertions, issuer, DID — must match your public tunnel URL.
// Set PUBLIC_URL in .env to your current Cloudflare tunnel (e.g. https://xxx.trycloudflare.com)
// so assertion id matches the URL Open Badge Passport fetches.
const PUBLIC_URL =
    process.env.PUBLIC_URL || "https://freelance-suddenly-silk-able.trycloudflare.com";

module.exports = { PUBLIC_URL };

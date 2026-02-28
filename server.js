require("dotenv").config(); // Load .env → process.env (PORT, KEY values)

const { PUBLIC_URL } = require("./config");
const express = require("express");
const cors = require("cors");

const didRoutes = require("./routes/did");
const credentialRoutes = require("./routes/credentials");
const statusRoutes = require("./routes/status");
const achievementRoutes = require("./routes/achievements");
const issuerRoutes = require("./routes/issuer");

const app = express();

// Global CORS — allows any origin to call our API
app.use(cors());
app.use(express.json());

// ─── Explicit CORS for /.well-known/did.json ──────────────────────────────
// Spec requirement: wallets (LinkedIn, verifiers) MUST be able to fetch this
// path cross-origin to retrieve the public key and validate signatures.
app.use("/.well-known", cors({ origin: "*" }));
// ─────────────────────────────────────────────────────────────────────────

// Routes
app.use(didRoutes);
app.use(credentialRoutes);
app.use(statusRoutes);
app.use(achievementRoutes);
app.use(issuerRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
    console.log(`   PUBLIC_URL   : ${PUBLIC_URL} (set in .env for Open Badge Passport)`);
    console.log(`   Assertion URL: ${PUBLIC_URL}/credentials/test`);
    console.log(`   DID Document : http://0.0.0.0:${PORT}/.well-known/did.json`);
    console.log(`   Test VC      : http://0.0.0.0:${PORT}/credentials/test`);
    console.log(`   Issue VC     : http://0.0.0.0:${PORT}/credentials/issue?name=Alice&course=Blockchain`);
    console.log(`   Achievement : http://0.0.0.0:${PORT}/achievements/node.js-course`);
    console.log(`   Issuer       : http://0.0.0.0:${PORT}/issuer`);
    console.log(`   Status       : http://0.0.0.0:${PORT}/status`);
});

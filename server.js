require("dotenv").config(); // Load .env → process.env (PORT, KEY values)

const express = require("express");
const cors = require("cors");

const didRoutes = require("./routes/did");
const credentialRoutes = require("./routes/credentials");
const statusRoutes = require("./routes/status");

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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`   DID Document : http://localhost:${PORT}/.well-known/did.json`);
    console.log(`   Test VC      : http://localhost:${PORT}/credentials/test`);
    console.log(`   Issue VC     : http://localhost:${PORT}/credentials/issue?name=Alice&course=Blockchain`);
    console.log(`   Status       : http://localhost:${PORT}/status`);
});

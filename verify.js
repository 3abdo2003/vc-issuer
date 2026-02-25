// verify.js — Locally verify a signed Verifiable Credential
// Usage: node verify.js
// Make sure sample.json exists (paste your VC output there first)

const { verify, loadKeys } = require("./services/cryptoService");
const fs = require("fs");
const path = require("path");

const samplePath = path.join(__dirname, "sample.json");

if (!fs.existsSync(samplePath)) {
    console.error("❌ sample.json not found.");
    console.error("   1. Start the server:  node server.js");
    console.error("   2. Visit:             http://localhost:3000/credentials/test");
    console.error("   3. Copy the JSON and save it as sample.json in this folder.");
    process.exit(1);
}

const credential = JSON.parse(fs.readFileSync(samplePath, "utf8"));

const { publicKey } = loadKeys();

// Strip the proof before verifying — the signature was made over the bare credential
const { proof, ...bareCredential } = credential;

const isValid = verify(bareCredential, proof.signature, publicKey);

console.log("🔍 Credential subject :", credential.credentialSubject?.name);
console.log("🏅 Achievement         :", credential.credentialSubject?.achievement?.name);
console.log("📅 Issued              :", credential.issuanceDate);
console.log("✅ Valid               :", isValid);

if (!isValid) {
    console.log("⚠️  Verification failed. This could be due to property ordering differences in JSON.stringify.");
}


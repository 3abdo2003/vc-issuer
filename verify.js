// verify.js — Locally verify a signed Verifiable Credential
// Usage: node verify.js [path_to_vc.json]

const { verify, loadKeys } = require("./services/cryptoService");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const samplePath = args[0] ? path.resolve(args[0]) : path.join(__dirname, "sample.json");

if (!fs.existsSync(samplePath)) {
    console.error(`❌ File not found: ${samplePath}`);
    console.error("   Usage: node verify.js [optional_path_to_json]");
    process.exit(1);
}

let credential;
try {
    credential = JSON.parse(fs.readFileSync(samplePath, "utf8"));
} catch (e) {
    console.error("❌ Failed to parse JSON file.");
    process.exit(1);
}

const { publicKey } = loadKeys();

// Strip the proof before verifying — the signature was made over the bare credential
const { proof, ...bareCredential } = credential;

if (!proof || !proof.signature) {
    console.error("❌ Credential does not contain a valid proof/signature.");
    process.exit(1);
}

const isValid = verify(bareCredential, proof.signature, publicKey);

console.log("-----------------------------------------");
console.log("🔍 Credential ID      :", credential.id);
console.log("👤 Subject Name       :", credential.credentialSubject?.name);
console.log("🏅 Achievement        :", credential.credentialSubject?.achievement?.name);
console.log("📅 Issued             :", credential.issuanceDate);
console.log("-----------------------------------------");
console.log(isValid ? "✅ Signature Valid: true" : "❌ Signature Valid: false");
console.log("-----------------------------------------");

if (!isValid) {
    console.log("⚠️  Verification failed. Root causes often include:");
    console.log("   - Property ordering changes in JSON serialization.");
    console.log("   - Context or ID mismatches.");
}


# VC Issuer — Platform Identity & Trust Layer

A high-security, standards-compliant **Verifiable Credential (VC)** issuer platform. This system implements the **Open Badges 2.0 (OBv2)** standard and provides a robust cryptographic foundation for issuing digital credentials that are globally recognizable and tamper-proof.

---

## 🛠️ Technology Stack

- **Runtime**: [Node.js](https://nodejs.org/) (High-performance JS runtime)
- **Framework**: [Express.js](https://expressjs.com/) (Lightweight web server)
- **Cryptography**: [TweetNaCl.js](https://tweetnacl.js.org/) (Audited implementation of Ed25519)
- **Standards**: 
  - **W3C Verifiable Credentials**: The core data container format.
  - **Open Badges 2.0 (OBv2)**: Specialized schema for achievements and badges.
  - **DID:Web**: Decentralized Identifier method for domain-based identity.
  - **JsonWebKey2020**: Standard format for representing cryptographic keys.

---

## 📖 User Story: How It Works

Imagine a student, **Alice**, completes a "Blockchain Mastery" course. Here is the lifecycle of her achievement:

1. **Identity Setup**: The institution (Issuer) initializes their platform. This generates a unique **Private Seal** (Private Key) and a **Public Validator** (Public Key).
2. **Global ID**: The platform announces itself to the world via a **DID Document** at `/.well-known/did.json`. This tells any wallet or employer: *"If you see a signature from me, here is the public key you need to verify it."*
3. **Issuance**: When Alice graduates, the Issuer calls the `/credentials/issue` endpoint. The platform takes her name and course, crafts a compliant **OB 2.0 JSON**, and stamps it with the Private Seal.
4. **Certificate Receipt**: Alice receives a signed JSON file. This is her **Verifiable Credential**. She can store it in a digital wallet or share it on LinkedIn.
5. **Verification**: An employer receives Alice's certificate. Their system automatically:
   - Fetches the Issuer's Public Key from the DID Document.
   - Performs a mathematical check (Ed25519) to ensure the data hasn't been changed by even one character.
   - Calls the `/credentials/status/:id` endpoint to ensure the badge hasn't been revoked.
6. **Trust established**: Alice is hired because her credentials are mathematically proven.

---

## 🏗️ Folder & File Architecture

### Root Directory
- `server.js`: The heart of the platform. It initializes the Express server, sets up security headers (CORS), and connects all the routes.
- `generate.js`: A specialized security utility. It creates a fresh, unique cryptographic key pair for the platform and saves it to `.env`. This ensures no two issuers share the same identity.
- `verify.js`: A developer/auditor CLI tool. It mimics a third-party verifier, allowing you to test if any issued credential is mathematically valid.
- `sample.json` & `alice_badge.json`: Examples of signed credentials produced by the system.

### `services/` — The Logic Layer
- `cryptoService.js`: The most critical security file. It handles the low-level signing and verification math, and converts raw keys into standardized **JSON Web Keys (JWK)**.
- `didService.js`: Constructs the platform's public identity document according to global decentralized identity standards.
- `credentialService.js`: The "Badge Factory." It builds the Open Badges 2.0 data structure, applies the cryptographic signature, and manages the temporary in-memory storage of all issued badges.

### `routes/` — The API Layer
- `did.js`: Serves the DID Document. Without this, external worlds cannot verify your badges.
- `credentials.js`: Handles all badge-related traffic: 
  - Issuing new badges (Standard and Dynamic).
  - Retrieving previously issued badges by their unique ID.
  - Providing the real-time revocation status of any badge.
- `status.js`: A simple health-check endpoint to monitor the server's operational state.

---

## ⚙️ Under The Hood: How It Works Together

### 1. Cryptographic Trust (Ed25519)
The system doesn't use simple passwords. It uses **Asymmetric Cryptography**.
- The **Private Key** (in `.env`) acts like a physical wax seal. Only the server has it.
- When a badge is signed, a unique mathematical fingerprint (The Signature) is generated based on the *exact* content of the badge.
- If a student tries to change their name from "Alice" to "Bob" inside the JSON, the mathematical verify check will fail immediately because the fingerprint won't match the new content.

### 2. Decentralized Identity (DID)
By serving a DID document at `/.well-known/did.json`, the platform becomes part of a global "Web of Trust." Every badge issued contains a `verificationMethod` ID that points back to this URL. This eliminates the need for a central authority (like a government registry) to verify the issuer.

### 3. Open Badges 2.0 (OBv2) Data Integrity
Standard JSON isn't enough for global interoperability. We use **JSON-LD** (Linked Data).
- The `@context` field tells generic computers exactly what "Achievement" or "Criteria" means.
- The `credentialStatus` field allows a wallet to automatically find the "Check-In" URL for that specific badge to see if it's still active.

---

## 🚀 Examples & Usage

### Issue a Custom Badge
Call the API with parameters:
`GET https://funky-annie-roulette-considerable.trycloudflare.com/credentials/issue?name=John&course=Advanced+React`

### Verify an Issued Badge
Save the output to a file (e.g., `test.json`) and run:
```bash
node verify.js test.json
```

**Output**:
```text
-----------------------------------------
🔍 Credential ID      : urn:uuid:...
👤 Subject Name       : John
🏅 Achievement        : Advanced React
📅 Issued             : 2026-02-25...
-----------------------------------------
✅ Signature Valid: true
-----------------------------------------
```

### Check Revocation Status
`GET https://funky-annie-roulette-considerable.trycloudflare.com/credentials/status/urn:uuid:...`
**Response**: `{"id": "...", "revoked": false, "message": "..."}`



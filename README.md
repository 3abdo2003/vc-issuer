# VC Issuer — Platform Identity & Trust Layer

I have completed the foundational **Trust Layer** for our Verifiable Credential system. This implementation ensures that every certificate we issue is cryptographically secure, globally recognizable, and tamper-proof.

## 🚀 Key Features

-   **Platform Identity (DID)**: I created a unique Decentralized Identifier (**did:web:localhost%3A4000**) which allows external verifiers to automatically identify our platform as the legitimate issuer of a certificate.
-   **Cryptographic Seal**: I implemented the **Ed25519 signature algorithm**. The system now has a "Digital Seal" (Private Key) that stamps every certificate and a "Public Validator" (Public Key) that anyone can use to verify our stamp.
-   **Global Standards**: The system fully follows the **JsonWebKey2020** standard. This ensures that the credentials we issue will be compatible with modern digital wallets and verification platforms worldwide.
-   **Secure Configuration**: All sensitive keys are stored in a secured `.env` configuration (Environment Variables), ensuring private keys are never exposed in the source code.

---

## 🛠️ API Endpoints & Testing

The server runs on **Port 4000** to avoid conflicts. Below is a breakdown of what each endpoint does:

### 1. Identity Endpoint (`/.well-known/did.json`)
-   **Job**: Public Identity Card.
-   **Explanation**: This is the "Public Validator." When a wallet receives a certificate, it automatically checks this hidden path to download our Public Key. This is how the world knows the certificate came from us and hasn't been faked.
-   **URL**: [http://localhost:4000/.well-known/did.json](http://localhost:4000/.well-known/did.json)

### 2. Issuance Endpoint (`/credentials/test`)
-   **Job**: Certificate Generator.
-   **Explanation**: This API pulls student data (e.g., "Abdelsamie") and uses the Private Key (The Seal) to stamp the JSON data with a cryptographic signature. It returns a fully signed **Verifiable Credential**.
-   **URL**: [http://localhost:4000/credentials/test](http://localhost:4000/credentials/test)

### 3. Dynamic Issuance (`/credentials/issue`)
-   **Job**: Custom Certificate Maker.
-   **Explanation**: Allows you to issue a certificate for any name and course via query parameters.
-   **Example**: `http://localhost:4000/credentials/issue?name=Alice&course=Blockchain`

### 4. Health Check (`/status`)
-   **Job**: System Heartbeat.
-   **Explanation**: Returns the current status of the issuer, version, and official DID.
-   **URL**: [http://localhost:4000/status](http://localhost:4000/status)

---

## 🧪 Local Verification

To prove the security of the system, I've included a standalone auditor:
1.  Run `node verify.js`.
2.  It takes the signed data and performs the math to check if the "Seal" matches the "Validator."
3.  If successful, it prints: **`✅ Valid: true`**.

---

## 🏗️ Getting Started

1.  **Install**: `npm install`
2.  **Generate Identity**: `node generate.js` (Creates your unique `.env` keys)
3.  **Run Server**: `node server.js`
4.  **Verify**: `node verify.js`

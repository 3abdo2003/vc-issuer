# VC Issuer — Platform Identity & Trust Layer

A secure, standards-compliant Verifiable Credential (VC) issuer platform. This system ensures that issued credentials are cryptographically secure, globally recognizable, and tamper-proof.

## 🚀 Key Features

- **Platform Identity (DID)**: Implements Decentralized Identifiers (**did:web:localhost%3A4000**) for automated issuer identification by external verifiers.
- **Cryptographic Security**: Utilizes the **Ed25519 signature algorithm** to provide a robust "Digital Seal" for credential signing and public verification.
- **Standards Compliance**: Fully adheres to the **JsonWebKey2020** specification, ensuring compatibility with modern digital wallets and global verification platforms.
- **Secure Configuration**: Sensitve keys are managed via environment variables (`.env`), preventing exposure of private keys in the source code.

---

## 🛠️ API Endpoints

The server operates on **Port 4000**. Key functional endpoints include:

### 1. Identity Document (`/.well-known/did.json`)
- **Purpose**: Public Identity Card.
- **Description**: Exposes the platform's Public Key, allowing wallets to verify the authenticity of credentials issued by this platform.
- **URL**: [http://localhost:4000/.well-known/did.json](http://localhost:4000/.well-known/did.json)

### 2. Standard Issuance (`/credentials/test`)
- **Purpose**: Pre-configured Credential Generation.
- **Description**: Generates a signed Verifiable Credential using a test student profile and the platform's private key.
- **URL**: [http://localhost:4000/credentials/test](http://localhost:4000/credentials/test)

### 3. Dynamic Issuance (`/credentials/issue`)
- **Purpose**: Parameterized Credential Generation.
- **Description**: Allows dynamic credential issuance via query parameters for flexible testing.
- **Example**: `http://localhost:4000/credentials/issue?name=Alice&course=Blockchain`

### 4. System Status (`/status`)
- **Purpose**: Health Monitoring.
- **Description**: Returns the platform's operational status, versioning, and official DID.
- **URL**: [http://localhost:4000/status](http://localhost:4000/status)

---

## 🧪 Local Verification

A standalone verification script is provided to audit credential security:
1. Run `node verify.js`.
2. The script validates the cryptographic signature of the credential against the issuer's public key.
3. Success is indicated by: **`✅ Valid: true`**.

---

## 🏗️ Getting Started

1. **Install Dependencies**: `npm install`
2. **Setup Identity**: `node generate.js` (Generates unique `.env` cryptographic keys)
3. **Start Server**: `node server.js`
4. **Run Verification**: `node verify.js`


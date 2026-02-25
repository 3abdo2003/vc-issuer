const { getPublicKeyJwk } = require("./cryptoService");

const DID = "did:web:https://vpn-televisions-wants-manufactured.trycloudflare.com";

// Builds a spec-compliant DID Document using the JsonWebKey2020 type.
// The publicKeyJwk field is what wallets (LinkedIn, employers) use to verify signatures.
function getDIDDocument() {
    return {
        "@context": "https://www.w3.org/ns/did/v1",
        id: DID,
        verificationMethod: [
            {
                id: `${DID}#key-1`,
                type: "JsonWebKey2020",         // ← spec requires this (not Ed25519VerificationKey2020)
                controller: DID,
                publicKeyJwk: getPublicKeyJwk(), // ← { kty: "OKP", crv: "Ed25519", x: "<base64url>" }
            },
        ],
        assertionMethod: [`${DID}#key-1`],
    };
}

module.exports = { getDIDDocument };

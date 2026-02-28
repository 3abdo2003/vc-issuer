const { getPublicKeyBase58 } = require("./cryptoService");
const { PUBLIC_URL } = require("../config");

const DID = `did:web:${PUBLIC_URL}`;

// Builds a spec-compliant DID Document using the JsonWebKey2020 type.
// The publicKeyJwk field is what wallets (LinkedIn, employers) use to verify signatures.
function getDIDDocument() {
    return {
        "@context": "https://www.w3.org/ns/did/v1",
        id: DID,
        verificationMethod: [
            {
                id: `${DID}#key-1`,
                type: "Ed25519VerificationKey2020",
                controller: DID,
                publicKeyBase58: getPublicKeyBase58(),
            },
        ],
        assertionMethod: [`${DID}#key-1`],
    };
}

module.exports = { getDIDDocument };

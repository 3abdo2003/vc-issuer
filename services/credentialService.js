const { sign } = require("./cryptoService");

const DID = "did:web:localhost%3A4000";

function buildCredential(studentName, courseTitle) {
    const credential = {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential"],
        issuer: DID,
        issuanceDate: new Date().toISOString(),
        credentialSubject: {
            id: "did:example:student123",
            name: studentName,
            achievement: {
                type: "Achievement",
                name: courseTitle,
            },
        },
    };

    const signature = sign(credential);

    return {
        ...credential,
        proof: {
            type: "Ed25519Signature2020",
            created: new Date().toISOString(),
            proofPurpose: "assertionMethod",
            verificationMethod: `${DID}#key-1`,
            signature,
        },
    };
}

module.exports = { buildCredential };

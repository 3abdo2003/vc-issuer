const { sign } = require("./cryptoService");

const DID = "did:web:localhost%3A4000";

// In-memory store for issued credentials
const credentialsStore = new Map();

function buildCredential(studentName, courseTitle) {
    const credentialId = `urn:uuid:${require("crypto").randomUUID()}`;
    const credential = {
        "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://purl.imsglobal.org/spec/ob/v3p0/context.json",
        ],
        id: credentialId,
        type: ["VerifiableCredential", "OpenBadgeCredential"],
        issuer: {
            id: DID,
            type: "Issuer",
            name: "VC Issuer Platform",
        },
        issuanceDate: new Date().toISOString(),
        credentialStatus: {
            id: `http://localhost:4000/credentials/status/${credentialId}`,
            type: "StatusList2021Entry",
            statusPurpose: "revocation",
            statusListIndex: "0",
            statusListCredential: "http://localhost:4000/credentials/status/list/1",
        },
        credentialSubject: {
            id: "did:example:student123",
            type: ["AchievementSubject"],
            name: studentName,
            achievement: {
                id: `http://localhost:4000/achievements/${courseTitle.toLowerCase().replace(/\s+/g, "-")}`,
                type: ["Achievement"],
                name: courseTitle,
                description: `This badge recognizes the successful completion of the ${courseTitle} course.`,
                criteria: {
                    type: "Criteria",
                    narrative: "Completion of all course modules and final assessment.",
                },
                image: {
                    id: "https://example.com/badges/course-image.png",
                    type: "Image",
                },
            },
        },
    };

    const signature = sign(credential);
    const signedVc = {
        ...credential,
        proof: {
            type: "Ed25519Signature2020",
            created: new Date().toISOString(),
            proofPurpose: "assertionMethod",
            verificationMethod: `${DID}#key-1`,
            signature,
        },
    };

    // Save to store
    credentialsStore.set(credentialId, signedVc);

    return signedVc;
}

function getCredentialById(id) {
    return credentialsStore.get(id);
}

module.exports = { buildCredential, getCredentialById };

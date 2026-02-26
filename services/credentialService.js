const { sign } = require("./cryptoService");

const PUBLIC_URL = "https://ministry-spreading-states-coding.trycloudflare.com";
// Open Badges v2 issuer profile URL (must be same-origin HTTPS)
const ISSUER_URL = `${PUBLIC_URL}/issuer`;
// DID is still used for cryptographic verification of the proof
const DID = `did:web:${PUBLIC_URL}`;

// In-memory store for issued credentials
const credentialsStore = new Map();

function buildCredential(studentName, courseTitle, overrideUuid = null) {
    const uuid = overrideUuid || require("crypto").randomUUID();
    const credentialId = `${PUBLIC_URL}/credentials/${uuid}`;
    const courseSlug = courseTitle.toLowerCase().replace(/\s+/g, "-");

    const credential = {
        // Use a single context string for maximum compatibility
        "@context": "https://w3id.org/openbadges/v2",
        id: credentialId,
        type: "Assertion",
        // Many consumers expect issuer to be a URL string to an Issuer Profile
        issuer: ISSUER_URL,
        // Open Badge Passport expects an "issuedOn" field (v2) and
        // internally maps it to an integer timestamp.
        issuedOn: new Date().toISOString(),
        recipient: {
            type: "email",
            hashed: false,
            identity: "abdulsamea2003@gmail.com",
            name: studentName,
        },
        badge: {
            id: `${PUBLIC_URL}/achievements/${courseSlug}`,
            type: "BadgeClass",
            name: courseTitle,
            description: `This badge recognizes the successful completion of the ${courseTitle} course.`,
            image: "https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg",
            criteria: {
                type: "Criteria",
                narrative: "Completion of all course modules and final assessment.",
            },
            // BadgeClass issuer is also a URL string to the same Issuer Profile
            issuer: ISSUER_URL,
        },
        // Required by many Open Badges consumers for hosted assertions
        verification: {
            type: "HostedBadge",
        },
        credentialStatus: {
            id: `${PUBLIC_URL}/credentials/status/urn:uuid:${uuid}`,
            type: "StatusList2021Entry",
            statusPurpose: "revocation",
            statusListIndex: "0",
            statusListCredential: `${PUBLIC_URL}/credentials/status/list/1`,
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

    // Save to store using the UUID as index (or the full URL)
    credentialsStore.set(uuid, signedVc);

    return signedVc;
}

function getCredentialById(id) {
    return credentialsStore.get(id);
}

module.exports = { buildCredential, getCredentialById };

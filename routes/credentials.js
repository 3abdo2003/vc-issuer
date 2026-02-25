const express = require("express");
const { buildCredential, getCredentialById } = require("../services/credentialService");

const router = express.Router();

// Test endpoint — issues a signed credential for "Abdelsamie"
router.get("/credentials/test", (req, res) => {
    const vc = buildCredential("Abdelsamie", "Node.js Course");
    res.json(vc);
});

// Dynamic endpoint — issue credential via query params
// Example: /credentials/issue?name=Alice&course=Blockchain+101
router.get("/credentials/issue", (req, res) => {
    const { name, course } = req.query;
    if (!name || !course) {
        return res
            .status(400)
            .json({ error: "Query params 'name' and 'course' are required." });
    }
    const vc = buildCredential(name, course);
    res.json(vc);
});

// GET /credentials/:id — Retrieve a specific signed credential
router.get("/credentials/:id", (req, res) => {
    const { id } = req.params;
    const vc = getCredentialById(id);
    if (!vc) {
        return res.status(404).json({ error: "Credential not found." });
    }
    res.json(vc);
});

// GET /credentials/status/:id — Returns revocation status
router.get("/credentials/status/:id", (req, res) => {
    const { id } = req.params;
    // We check if the credential exists first
    const vc = getCredentialById(id);
    if (!vc) {
        return res.status(404).json({ error: "Credential not found." });
    }
    // For now, we return a standard "not revoked" response
    res.json({
        id,
        revoked: false,
        message: "Credential is valid and active.",
    });
});

module.exports = router;

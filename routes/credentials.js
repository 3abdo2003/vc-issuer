const express = require("express");
const { buildCredential } = require("../services/credentialService");

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

module.exports = router;

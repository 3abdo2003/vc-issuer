const express = require("express");
const { PUBLIC_URL } = require("../config");

const router = express.Router();

router.get("/status", (req, res) => {
    res.json({
        status: "ok",
        version: "1.0.0",
        issuer: `did:web:${PUBLIC_URL}`,
        timestamp: new Date().toISOString(),
    });
});

module.exports = router;

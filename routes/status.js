const express = require("express");

const router = express.Router();

router.get("/status", (req, res) => {
    res.json({
        status: "ok",
        version: "1.0.0",
        issuer: "did:web:https://vpn-televisions-wants-manufactured.trycloudflare.com",
        timestamp: new Date().toISOString(),
    });
});

module.exports = router;

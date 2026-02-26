const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.get("/achievements/node.js-course", (req, res) => {
    const badgePath = path.join(__dirname, "../data/nodejs-badge.json");
    if (!fs.existsSync(badgePath)) {
        return res.status(404).json({ error: "Achievement metadata not found." });
    }
    const badgeData = JSON.parse(fs.readFileSync(badgePath, "utf8"));
    res.json(badgeData);
});

module.exports = router;

const express = require("express");
const { getDIDDocument } = require("../services/didService");

const router = express.Router();

router.get("/.well-known/did.json", (req, res) => {
    res.json(getDIDDocument());
});

module.exports = router;

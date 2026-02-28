const express = require("express");
const { PUBLIC_URL } = require("../config");

const router = express.Router();

// Open Badges v2 issuer profile
// This URL must match the issuer.id used in assertions and BadgeClass metadata.
router.get("/issuer", (req, res) => {
    res.json({
        "@context": "https://w3id.org/openbadges/v2",
        id: `${PUBLIC_URL}/issuer`,
        type: "Issuer",
        name: "VC Issuer Platform",
        // Include an image so platforms can determine a MIME type
        image: "https://placehold.co/200x200/0ea5e9/ffffff.png?text=Badge",
        url: PUBLIC_URL,
        description: "Issuer profile for VC Issuer Platform, used for Open Badges hosted assertions.",
    });
});

module.exports = router;


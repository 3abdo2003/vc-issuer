const express = require("express");

const router = express.Router();

// Open Badges v2 issuer profile
// This URL must match the issuer.id used in assertions and BadgeClass metadata.
router.get("/issuer", (req, res) => {
    res.json({
        "@context": "https://w3id.org/openbadges/v2",
        id: "https://ministry-spreading-states-coding.trycloudflare.com/issuer",
        type: "Issuer",
        name: "VC Issuer Platform",
        // Include an image so platforms can determine a MIME type
        image: "https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg",
        url: "https://ministry-spreading-states-coding.trycloudflare.com",
        description: "Issuer profile for VC Issuer Platform, used for Open Badges hosted assertions.",
    });
});

module.exports = router;


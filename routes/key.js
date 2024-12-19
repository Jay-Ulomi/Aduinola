const express = require('express');
const router = express.Router();
const { publicKey } = require('../key.js'); // Import public key

// Route to Serve Admin's Public Key
router.get('/admin-public-key', (req, res) => {
    res.json({ publicKey }); // Wrap the key in an object
    console.log('Public Key Sent:', publicKey);
});

module.exports = router;

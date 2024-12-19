const forge = require('node-forge');
const rsa = forge.pki.rsa;

// Generate RSA Keys
const adminKeys = rsa.generateKeyPair(2048);

// Convert Keys to PEM Format
const adminPublicKeyPem = forge.pki.publicKeyToPem(adminKeys.publicKey);
const adminPrivateKeyPem = forge.pki.privateKeyToPem(adminKeys.privateKey);

// Export
module.exports = {
    publicKey: adminPublicKeyPem,
    privateKey: adminPrivateKeyPem,
};

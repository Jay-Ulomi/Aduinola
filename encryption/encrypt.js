const forge = require('node-forge');

// Encrypt a message using a public key
const encryptMessage = (message, publicKeyPem) => {
    try {
        const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
        const encrypted = publicKey.encrypt(message, 'RSA-OAEP');
        return forge.util.encode64(encrypted); // Encode as Base64
    } catch (error) {
        console.error('Encryption Error:', error.message);
        throw new Error('Encryption failed. Check the public key and message.');
    }
};

// Decrypt a message using a private key
const decryptMessage = (encryptedMessage, privateKeyPem) => {
    try {
        const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
        const encryptedBytes = forge.util.decode64(encryptedMessage); // Decode from Base64
        return privateKey.decrypt(encryptedBytes, 'RSA-OAEP');
    } catch (error) {
        console.error('Decryption Error:', error.message);
        throw new Error('Decryption failed. Check the private key and encrypted message.');
    }
};

module.exports = { encryptMessage, decryptMessage };

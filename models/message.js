const mongoose = require('mongoose');

// Mongoose model for storing chat messages
const messageSchema = new mongoose.Schema({
    user: String,
    email: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    role: { type: String, default: 'user' }, // user or admin
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

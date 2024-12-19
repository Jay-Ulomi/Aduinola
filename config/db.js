const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
    const DB=process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
        await mongoose.connect(DB);
        
        console.log("MongoDB connected!");
    } catch (err) {
        console.error("Database connection error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

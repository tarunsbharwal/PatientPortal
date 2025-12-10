const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const documentRoutes = require('./routes/documentRoutes');

// Load config
dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows frontend to talk to backend
app.use(express.json()); // Allows backend to read JSON data

// Routes
app.use('/api/documents', documentRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
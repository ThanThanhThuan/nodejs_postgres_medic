// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow frontend to communicate
app.use(express.json()); // Parse JSON bodies

// Database Connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    // Add this SSL block -for render.com postgres:
    ssl: {
        rejectUnauthorized: false // This allows connection without checking for a specific certificate
    }
});

// Test DB Connection
pool.connect((err) => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected to PostgreSQL database');
    }
});

// --- ROUTES ---

// POST: Create a new booking
app.post('/api/bookings', async (req, res) => {
    try {
        const { name, email, phone, date, message } = req.body;

        // Basic validation
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and Email are required.' });
        }

        const query = `
            INSERT INTO bookings (name, email, phone, booking_date, message)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;

        const values = [name, email, phone, date, message];

        const result = await pool.query(query, values);

        res.status(201).json({
            message: 'Booking successful!',
            booking: result.rows[0]
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET: Check server status
app.get('/', (req, res) => {
    res.send('Medic Care API is running');
});

// GET: Retrieve all bookings (for Admin)
app.get('/api/bookings', async (req, res) => {
    try {
        // Order by newest first
        const result = await pool.query('SELECT * FROM bookings ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
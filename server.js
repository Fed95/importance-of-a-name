const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// PostgreSQL connection pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// API endpoint to search for names
app.get('/api/search', async (req, res) => {
    const { name } = req.query;
    try {
        const result = await pool.query('SELECT name, audio_url FROM names WHERE name ILIKE $1', [`%${name}%`]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Serve static files (your HTML and other assets)
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

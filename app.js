const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Allow frontend to access backend
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
    host: 'database-3.c58wagsk8kyu.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'katasandi1',
    database: 'ecommerce'
});

// Produk API endpoint
app.get('/api/produk', (req, res) => {
    db.query('SELECT price FROM products LIMIT 1', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const price = results[0]?.price || 0;
        const imageUrls = [
            'https://ecommerce-gambar-produk.s3.ap-southeast-1.amazonaws.com/sepatu1.jpg',
            'https://ecommerce-gambar-produk.s3.ap-southeast-1.amazonaws.com/sepatu2.jpg',
            'https://ecommerce-gambar-produk.s3.ap-southeast-1.amazonaws.com/sepatu3.jpg'
        ];

        res.json({
            images: imageUrls,
            price: price
        });
    });
});

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Backend berjalan di http://0.0.0.0:${port}`);
});

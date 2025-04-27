const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const imageUrls = [
    'https://ecommerce-gambar-produk.s3.ap-southeast-1.amazonaws.com/sepatu1.jpg',
    'https://ecommerce-gambar-produk.s3.ap-southeast-1.amazonaws.com/sepatu2.jpg',
    'https://ecommerce-gambar-produk.s3.ap-southeast-1.amazonaws.com/sepatu3.jpg'
];

const db = mysql.createConnection({
    host: 'database-3.c58wagsk8kyu.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'katasandi1',
    database: 'ecommerce'
});

app.get('/', (req, res) => {
    db.query('SELECT price FROM products LIMIT 1', (err, results) => {
        if (err) throw err;
        const price = results[0].price;

        const imagesHtml = imageUrls.map(url => `<img src="${url}" width="200" style="margin:10px;" />`).join('');

        res.send(`
            <h1>Produk Kami</h1>
            ${imagesHtml}
            <p>Harga: Rp ${price}</p>
        `); // <-- jangan lupa tutup disini
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server berjalan di http://0.0.0.0:${port}`);
});

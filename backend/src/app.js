require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const Minio = require('minio');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const dbConfig = {
    host: process.env.DB_HOST || 'mysql',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'myapp'
};

// MinIO connection
const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT || 'minio',
    port: parseInt(process.env.MINIO_PORT) || 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
    secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin'
});

// Test endpoint
app.get('/api/test', async (req, res) => {
    try {
        // Test MySQL connection
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT 1 + 1 AS solution');
        connection.end();

        // Test MinIO connection
        const buckets = await minioClient.listBuckets();

        res.json({
            mysql: rows[0].solution === 2 ? 'OK' : 'Error',
            minio: buckets ? 'OK' : 'Error',
            message: 'Backend is working!'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
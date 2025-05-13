require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const Minio = require('minio');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
    host: process.env.DB_HOST || 'mysql',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'myapp'
};

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT || 'minio',
    port: parseInt(process.env.MINIO_PORT) || 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
    secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin'
});

// Hàm kiểm tra kết nối MySQL với đo thời gian
async function checkMySQLConnection() {
    const start = Date.now();
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT 1 + 1 AS solution');
        await connection.end();

        const duration = Date.now() - start;
        return {
            status: rows[0].solution === 2 ? 'OK' : 'ERROR',
            duration: `${duration}ms`
        };
    } catch (error) {
        return {
            status: 'ERROR',
            duration: `${Date.now() - start}ms`,
            error: error.message
        };
    }
}

// Hàm kiểm tra kết nối MinIO với đo thời gian
async function checkMinIOConnection() {
    const start = Date.now();
    try {
        const buckets = await minioClient.listBuckets();
        const duration = Date.now() - start;
        return {
            status: buckets ? 'OK' : 'ERROR',
            duration: `${duration}ms`
        };
    } catch (error) {
        return {
            status: 'ERROR',
            duration: `${Date.now() - start}ms`,
            error: error.message
        };
    }
}

// Health check endpoint cho Docker
app.get('/health', async (req, res) => {
    const healthCheck = {
        uptime: process.uptime(),
        timestamp: Date.now(),
        checks: {}
    };

    try {
        healthCheck.checks.mysql = await checkMySQLConnection();
        healthCheck.checks.minio = await checkMinIOConnection();

        // Kiểm tra nếu có service nào lỗi
        const hasError = Object.values(healthCheck.checks).some(
            check => check.status === 'ERROR'
        );

        const statusCode = hasError ? 503 : 200;
        res.status(statusCode).json(healthCheck);
    } catch (error) {
        healthCheck.error = error.message;
        res.status(503).json(healthCheck);
    }
});

// Test endpoint (phiên bản cải tiến)
app.get('/api/test', async (req, res) => {
    try {
        const mysqlCheck = await checkMySQLConnection();
        const minioCheck = await checkMinIOConnection();

        res.json({
            services: {
                mysql: mysqlCheck,
                minio: minioCheck
            },
            message: 'Backend is working!',
            uptime: process.uptime()
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            timestamp: Date.now()
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
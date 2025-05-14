const Minio = require('minio');
const { v4: uuidv4 } = require('uuid');

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT || 'minio',
    port: parseInt(process.env.MINIO_PORT) || 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
    secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin'
});

const bucketName = 'products';
const publicEndpoint = process.env.MINIO_PUBLIC_ENDPOINT || 'localhost:9000';

async function initMinio() {
    try {
        const bucketExists = await minioClient.bucketExists(bucketName);
        if (!bucketExists) {
            await minioClient.makeBucket(bucketName);
            await minioClient.setBucketPolicy(
                bucketName,
                JSON.stringify({
                    Version: '2012-10-17',
                    Statement: [
                        {
                            Effect: 'Allow',
                            Principal: '*',
                            Action: ['s3:GetObject'],
                            Resource: [`arn:aws:s3:::${bucketName}/*`]
                        }
                    ]
                })
            );
            console.log(`Bucket '${bucketName}' created and set to public`);
        }
        console.log('MinIO client initialized');
    } catch (error) {
        console.error('MinIO initialization failed:', error);
        process.exit(1);
    }
}

async function uploadFile(file) {
    const objectName = `${uuidv4()}-${file.originalname}`;

    await minioClient.putObject(
        bucketName,
        objectName,
        file.buffer,
        file.size,
        {
            'Content-Type': file.mimetype
        }
    );

    return `http://${publicEndpoint}/${bucketName}/${objectName}`;
}

async function deleteFile(url) {
    let objectName;
    if (url.includes(bucketName)) {
        objectName = url.split(`${bucketName}/`)[1];
    } else {
        objectName = url.split('/').pop();
    }
    await minioClient.removeObject(bucketName, objectName);
}

module.exports = { minioClient, initMinio, uploadFile, deleteFile };
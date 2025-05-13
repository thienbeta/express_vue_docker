const minioClient = require('../services/storageService');

exports.getBuckets = async (req, res) => {
    try {
        const buckets = await minioClient.listBuckets();
        res.json(buckets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const express = require('express');
const router = express.Router();
const storageController = require('../controllers/storageController');

router.get('/buckets', storageController.getBuckets);

module.exports = router;

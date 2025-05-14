const Product = require('../models/productModel');
const { uploadFile } = require('../config/minio');
const { uploadSingleImage } = require('../middlewares/uploadMiddleware');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createProduct = async (req, res) => {
    uploadSingleImage(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        try {
            const { name, description, price } = req.body;
            let image_url = null;

            if (req.file) {
                image_url = await uploadFile(req.file);
            }

            const product = await Product.create({ name, description, price, image_url });
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};

exports.updateProduct = async (req, res) => {
    uploadSingleImage(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        try {
            const { name, description, price } = req.body;
            let image_url = null;

            if (req.file) {
                image_url = await uploadFile(req.file);
            }

            // If no new image uploaded, keep the existing one
            if (!image_url) {
                const existingProduct = await Product.findById(req.params.id);
                if (existingProduct) {
                    image_url = existingProduct.image_url;
                }
            }

            const product = await Product.update(req.params.id, {
                name,
                description,
                price,
                image_url
            });

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.delete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
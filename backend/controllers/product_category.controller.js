const db = require('../models');
const ProductCategory = db.ProductCategory;

exports.getAll = async (req, res) => {
    try {
        const productCategories = await ProductCategory.findAll();
        res.json(productCategories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const productCategory = await ProductCategory.findByPk(req.params.id);
        res.json(productCategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const productCategory = await ProductCategory.create(req.body);
        res.json(productCategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const productCategory = await ProductCategory.findByPk(req.params.id);
        res.json(productCategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const productCategory = await ProductCategory.findByPk(req.params.id);
        res.json(productCategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

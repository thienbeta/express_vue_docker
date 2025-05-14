const { pool } = require('../config/db');
const { deleteFile } = require('../config/minio');

class Product {
    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM products');
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    }

    static async create({ name, description, price, image_url }) {
        const [result] = await pool.query(
            'INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)',
            [name, description, price, image_url]
        );
        return this.findById(result.insertId);
    }

    static async update(id, { name, description, price, image_url }) {
        // Get current product to delete old image if needed
        const product = await this.findById(id);

        await pool.query(
            'UPDATE products SET name = ?, description = ?, price = ?, image_url = ? WHERE id = ?',
            [name, description, price, image_url, id]
        );

        // Delete old image if it's different from new one
        if (product.image_url && product.image_url !== image_url) {
            try {
                await deleteFile(product.image_url);
            } catch (error) {
                console.error('Error deleting old image:', error);
            }
        }

        return this.findById(id);
    }

    static async delete(id) {
        const product = await this.findById(id);
        if (!product) return null;

        // Delete associated image
        if (product.image_url) {
            try {
                await deleteFile(product.image_url);
            } catch (error) {
                console.error('Error deleting image:', error);
            }
        }

        await pool.query('DELETE FROM products WHERE id = ?', [id]);
        return product;
    }
}

module.exports = Product;
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const { connectDB } = require('./config/db');
const { initMinio } = require('./config/minio');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.use('/api/products', productRoutes);

connectDB();
initMinio();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
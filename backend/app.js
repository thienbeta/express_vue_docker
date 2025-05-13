require('dotenv').config();
const express = require('express');
const cors = require('cors');

const healthRoutes = require('./src/routes/healthRoutes');
const exampleRoutes = require('./src/routes/exampleRoutes');
const storageRoutes = require('./src/routes/storageRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/health', healthRoutes);
app.use('/example', exampleRoutes);
app.use('/storage', storageRoutes);

module.exports = app;

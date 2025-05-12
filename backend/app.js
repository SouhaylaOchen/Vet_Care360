const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const ownerRoutes = require('./routes/ownerRoutes');
const petRoutes = require('./routes/petRoutes');
const visitRoutes = require('./routes/visitRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/owners', ownerRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/visits', visitRoutes);

app.get('/', (req, res) => {
res.send('VetCare360 Backend Running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log('🚀 Server running on http://localhost:${PORT}');
});
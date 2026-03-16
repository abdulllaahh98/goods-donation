const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Goods Donation API is running.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

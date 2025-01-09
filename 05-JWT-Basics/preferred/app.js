const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/v1', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

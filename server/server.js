const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const weatherRoute = require('./routes/weather');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/weather', weatherRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
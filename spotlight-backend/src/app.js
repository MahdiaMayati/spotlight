require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');


const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Spotlight API is running smoothly!' });
});

module.exports = app;
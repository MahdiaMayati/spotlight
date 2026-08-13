require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');


const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const apiRoutes = require('./routes/apiRoutes');
const trackVisitor = require('./middlewares/analyticsMiddleware');
const analyticsRoutes = require('./routes/analyticsRoutes');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());



app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(trackVisitor);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/v1', apiRoutes);
// بدلاً من app.use('/api', apiRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'Spotlight API is running smoothly!' });
});

module.exports = app;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('../routes/userRoutes');
const taskRoutes = require('../routes/taskRoutes');
const errorMiddleware = require('../middlewares/errorMiddleware');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/task', taskRoutes);

app.use(errorMiddleware.error);

module.exports = app;
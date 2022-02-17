const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('../routes/userRoutes');
const taskRoutes = require('../routes/taskRoutes');
const loginRoutes = require('../routes/loginRoutes');
const errorMiddleware = require('../middlewares/errorMiddleware');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/task', taskRoutes);
app.use('/login', loginRoutes);

app.use(errorMiddleware.error);

module.exports = app;
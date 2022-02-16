const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('../routes/userRoutes');
const taskRoutes = require('../routes/taskRoutes');
const errorMiddleware = require('../middlewares/errorMiddleware');

app.use(express.json());

app.use('/user', userRoutes);
app.use('/task', taskRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(errorMiddleware.error);

module.exports = app;
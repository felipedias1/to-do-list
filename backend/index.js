const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./src/routes/userRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const errorMiddleware = require('./src/middlewares/errorMiddleware');

app.use(express.json());

app.use('/user', userRoutes);
app.use('/task', taskRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(errorMiddleware.error);
const express = require('express');
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, taskController.newTaskController);

module.exports = router;
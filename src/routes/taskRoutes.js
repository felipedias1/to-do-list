const express = require('express');
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, taskController.newTaskController);
router.get('/', auth, taskController.getTaskController);
router.put('/:id', auth, taskController.updateTaskController);
router.delete('/:id', auth, taskController.deleteTaskController);

module.exports = router;
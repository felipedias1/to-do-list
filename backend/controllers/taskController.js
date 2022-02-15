const taskService = require('../services/taskService');

const newTaskController = async (req, res, next) => {
  try {
    const newTask = req.body;
    console.log(newTask);
    const createTask = await taskService.newTaskService(newTask);
    return res.status(201).json({ message: 'Task was created', _id: createTask});
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

module.exports = {
  newTaskController,
}
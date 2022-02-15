const taskService = require('../services/taskService');

const newTaskController = async (req, res, next) => {
	try {
		const newTask = req.body;
		const { id: userId, email } = req.user;
		const createTask = await taskService.newTaskService(newTask, userId, email);
		return res.status(201).json({ message: 'Task was created', _id: createTask});
	} catch (error) {
		console.log(error.message);
		return next(error);
	}
};

const getTaskController = async (req, res, next) => {
	try {
		const { id: userId, email } = req.user;
		const getAllTasks = await taskService.getTaskService(userId, email);
		return res.status(200).json(getAllTasks);
	} catch (error) {
		console.log(error.message);
		return next(error);
	}
};

module.exports = {
	newTaskController,
	getTaskController,
};
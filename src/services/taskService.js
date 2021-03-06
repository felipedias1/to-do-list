const taskModel = require('../models/taskModel');
const userModel = require('../models/userModel');
const JOI = require('@hapi/joi');
const { errorUtils } = require('./utils');

const taskSchema = JOI.object({
	text: JOI.string().required(), 
	status: JOI.string().valid('pendente', 'em andamento', 'pronto').required(), 
});

const newTaskService = async (newTask, userId, email) => {
	const { text, status } = newTask;

	const validate = taskSchema.validate({ text, status });
	if (validate.error) throw errorUtils(400, validate.error.message);

	const userExists = await userModel.searchEmail(email);
	if (!userExists) throw errorUtils(400, 'User does not exists');

	const createTask = await taskModel.newTaskModel(newTask, userId);
	return createTask;
};

const getTaskService = async (userId, email) => {

	const userExists = await userModel.searchEmail(email);
	if (!userExists) throw errorUtils(400, 'User does not exists');

	const createTask = await taskModel.getTaskModel(userId);
	return createTask;
};

const updateTaskService = async (updateTask, taskId, userId) => {
	const { text, status } = updateTask;

	const validate = taskSchema.validate({ text, status });
	if (validate.error) throw errorUtils(400, validate.error.message);

	const taskExists = await taskModel.getOneTaskByIdModel(taskId);
	if (!taskExists) throw errorUtils(400, 'Task does not exists');

	if (taskExists[0].userId !== userId) throw errorUtils(400, 'Unauthorized user');

	const changedTask = await taskModel.updateTaskModel(taskId, text, status);

	return changedTask;
};

const deleteTaskService = async (taskId, userId) => {

	const taskExists = await taskModel.getOneTaskByIdModel(taskId);
	if (!taskExists) throw errorUtils(400, 'Task does not exists');

	if (taskExists[0].userId !== userId) throw errorUtils(400, 'Unauthorized user');

	await taskModel.deleteTaskModel(taskId);
};

module.exports = {
	newTaskService,
	getTaskService,
	updateTaskService,
	deleteTaskService,
};
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

module.exports = {
	newTaskService,
	getTaskService,
};
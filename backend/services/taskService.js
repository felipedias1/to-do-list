const taskModel = require('../models/taskModel');
const JOI = require('@hapi/joi');
const { errorUtils } = require('./utils');

const taskSchema = JOI.object({
	text: JOI.string().required(), 
	status: JOI.string().valid('pendente', 'em andamento', 'pronto').required(), 
});

const newTaskService = async (newTask) => {
	const { text, status } = newTask;

	const validate = taskSchema.validate({ text, status });
	if (validate.error) throw errorUtils(400, validate.error.message);

	const createTask = await taskModel.newTaskModel(newTask);
	return createTask;
};

module.exports = {
	newTaskService,
};
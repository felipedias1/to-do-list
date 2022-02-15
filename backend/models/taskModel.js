const connection = require('./connection');
const { ObjectId } = require('mongodb');

const newTaskModel = async (newTask, userId) => {
	const { text, status } = newTask;
	const connect = await connection();

	const { insertedId } = await connect.collection('tasks').insertOne({
		text, 
		status,
		userId,
		date: new Date(),
	});
	return insertedId ;
};

const getTaskModel = async (userId) => {
	const connect = await connection();
	const getAllTasks = await connect.collection('tasks').find({ userId }).toArray();
	return getAllTasks ;
};

const getOneTaskByIdModel = async (taskId) => {
	const connect = await connection();
	const getTask = await connect.collection('tasks').find({ _id: ObjectId(taskId) }).toArray();
	return getTask ;
};

const updateTaskModel = async (taskId, text, status ) => {
	const connect = await connection();
	await connect.collection('tasks').updateOne(
		{ _id: ObjectId(taskId) }, 
		{ $set: { text, status } });
	const updateTask = getOneTaskByIdModel(taskId);
	return updateTask ;
};

module.exports = {
	newTaskModel,
	getTaskModel,
	getOneTaskByIdModel,
	updateTaskModel
};
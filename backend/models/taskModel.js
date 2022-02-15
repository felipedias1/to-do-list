const connection = require('./connection');

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

module.exports = {
	newTaskModel,
	getTaskModel
};
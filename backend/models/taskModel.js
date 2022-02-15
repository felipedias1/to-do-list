const connection = require('./connection');

const newTaskModel = async (newTask) => {
	const { text, status } = newTask;
	const connect = await connection();

	const { insertedId } = await connect.collection('tasks').insertOne({
		text, 
		status,
		date: new Date(),
	});
	return insertedId ;
};

module.exports = {
	newTaskModel,
};
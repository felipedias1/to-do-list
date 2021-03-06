const userService = require('../services/userService');

const newUserController = async (req, res, next) => {
	try {
		const newUser = req.body;
		const createUser = await userService.newUserService(newUser);
		return res.status(201).json({ token: createUser });
	} catch (error) {
		console.log(error.message);
		return next(error);
	}
};

module.exports = {
	newUserController,
};
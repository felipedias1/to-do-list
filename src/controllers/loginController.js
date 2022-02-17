const loginService = require('../services/loginService');

const newloginController = async (req, res, next) => {
	try {
		const user = req.body;
    const token = await loginService.verifyLoginService(user);
		return res.status(200).json({ token });
	} catch (error) {
		console.log(error.message);
		return next(error);
	}
};

module.exports = {
	newloginController,
};
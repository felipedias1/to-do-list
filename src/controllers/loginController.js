const loginService = require('../services/loginService');

const newloginController = async (req, res, next) => {
	try {
		const user = req.body;
    const userlogin = await loginService.verifyLoginService(user);
		return res.status(200).json({ dataUser: userlogin });
	} catch (error) {
		console.log(error.message);
		return next(error);
	}
};

module.exports = {
	newloginController,
};
const JOI = require('@hapi/joi');
const user = require('../models/userModel');
const authService = require('./authService');
const { errorUtils } = require('./utils')

const loginSchema = JOI.object({
  email: JOI.string().email().required(),
  password: JOI.string().required(), 
});

const verifyLoginService = async (userData) => {
  const errorTwo = { status: 401, message: { message: 'Incorrect username or password' } };
  const { email, password } = userData;
  
  const validate = loginSchema.validate({ email, password });
  
  if (validate.error) throw errorUtils(400, 'All fields must be filled');
  
  const checkLogin = await user.searchEmail(email);

  if (!checkLogin || checkLogin.password !== password) throw errorUtils(400, 'Email or password invalid');

  const { password: _password, ...noPassword } = checkLogin;
  const { _id: id, name } = noPassword
  console.log(noPassword);

  const token = authService.genToken(noPassword);

  return { token, id, name, email }
};

module.exports = {
  verifyLoginService,
};
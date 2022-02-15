const userModel = require('../models/userModel');
const JOI = require('@hapi/joi');
const { errorUtils } = require('./utils');

const userSchema = JOI.object({
  name: JOI.string().required().min(8), 
  email: JOI.string().email().required(), 
  password: JOI.string().required().length(6),
});

const newUserService = async (newUser) => {
  const { name, email, password } = newUser

  const validate = userSchema.validate({ name, email, password });
  if (validate.error) throw errorUtils(400, validate.error.message);

  const createUser = await userModel.newUserMod(newUser);
  return createUser;
};

module.exports = {
  newUserService,
}

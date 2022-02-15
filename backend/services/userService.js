const userModel = require('../models/userModel');

const newUserService = async (newUser) => {
  const createUser = await userModel.newUserMod(newUser);
  return createUser;
};

module.exports = {
  newUserService,
}

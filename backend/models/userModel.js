const connection = require('./connection');

const newUserMod = async (newUser) => {
  const { name, email, password } = newUser
  const connect = await connection();

  const { insertedId } = await connect.collection('users').insertOne({
      name,
      email,
      password,
      role: 'user',
  });
  return insertedId ;
};

const searchEmail = async (email) => {
  const connect = await connection();
  const validateEmail = await connect.collection('users').findOne({ email });
  return validateEmail;
};

module.exports = {
  newUserMod,
  searchEmail,
};
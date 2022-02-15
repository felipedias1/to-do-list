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

module.exports = {
  newUserMod,
};
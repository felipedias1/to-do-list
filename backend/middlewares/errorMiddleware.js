const error = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  console.log('ERRO -> ', err);
  res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = {
  error,
};
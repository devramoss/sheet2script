const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const autenticarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Token:', token);

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'jsdajhhdajshdahdasda8723119091874@@@@', (err, user) => {
      if (err) return res.sendStatus(403);
      console.log('Usuário:', user);
      req.user = user;
      next();
  });
};


module.exports = autenticarToken;


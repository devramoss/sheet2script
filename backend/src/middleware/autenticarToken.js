const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function autenticarToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({
       error: 'Token não fornecido'
      });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({
        error: 'Token inválido'
      });
    }

    req.usuario = usuario;
    
    next();
  });
}

module.exports = autenticarToken;


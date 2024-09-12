const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const autenticarToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Recebe o token do header
  const token = authHeader && authHeader.split(' ')[1]; // Separa o token do header

  console.log('Token:', token);

  if (token == null) 
    return res.sendStatus(401).json({ message: 'Token não fornecido' }); // Retorna erro se o token não for fornecido

  jwt.verify(token, 'jsdajhhdajshdahdasda8723119091874@@@@', (err, user) => {
      if (err) 
        return res.sendStatus(403).json({ message: 'Token inválido' }); // Retorna erro se o token for inválido
        console.log('Usuário:', user);
        req.user = user; // Adiciona o usuário ao objeto de requisição
        next();
  });
};


module.exports = autenticarToken;


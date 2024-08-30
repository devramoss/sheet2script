const express = require('express');
const autenticarToken = require('../middleware/autenticarToken');

const router = express.Router();

// Exemplo de rota privada
router.get('/', autenticarToken, (req, res) => {
  res.json({ message: `Bem-vindo, usuário ${req.usuario.id}. Aqui estão seus dados seguros!` });
});

module.exports = router;

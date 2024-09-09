const express = require('express');
const router = express.Router();
const { uploadPlanilha } = require('../controladores/planilha');
const autenticarToken = require('../middleware/autenticarToken');
//const authMiddleware = require('../middlewares/auth'); // Middleware de autenticação

// Rota para upload da planilha (protegida com autenticação)
router.post('/upload', autenticarToken, uploadPlanilha);

module.exports = router;

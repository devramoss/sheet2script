const {Router} = require('express');
const {realizarCadastro} = require('../controladores/cadastro');

const router = Router();

router.post('/', realizarCadastro);

module.exports = router;
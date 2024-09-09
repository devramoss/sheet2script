const { Router } = require('express');
const { realizarLogin } = require('../controladores/login');

const router = Router();

// Rota para realizar o login
router.post('/', realizarLogin);

// Rota GET para buscar um recurso pelo ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  // Exemplo de lógica para buscar um usuário ou outro recurso pelo ID
  try {
    const user = await buscarUsuarioPorId(id); // Supondo que você tenha uma função para isso

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;

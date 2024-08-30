const {Router} = require('express');
const { realizarLogin } = require('../controladores/login');

const router = Router();

router.post('/', realizarLogin);
router.get('/:id', async(req, res) => {
    
});

module.exports = router;
    
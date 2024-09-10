const express = require('express');
const multer = require('multer');
const storage = require('../config/multer');
const uploadPlanilha = require('../controladores/planilha'); // Ajuste o caminho conforme a estrutura do seu projeto

const router = express.Router();

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res) => {
    uploadPlanilha(req, res);
});

module.exports = router;

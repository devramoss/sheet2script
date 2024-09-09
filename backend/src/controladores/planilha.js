const { Planilha } = require('../modelos/Planilha');
const multer = require('multer');

// Configurar o multer para salvar os arquivos localmente
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/')); // Caminho absoluto para uploads
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('arquivo');


// controllers/planilhaController.js
exports.uploadPlanilha = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado.' });
        }

        const usuarioId = req.user.id;

        if (!req.file) {
            return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
        }

        // Salvar no banco de dados
        const newPlanilha = await Planilha.create({
            nomeArquivo: req.file.filename,
            usuarioId: usuarioId,
        });

        res.status(200).json({
            message: 'Planilha carregada e armazenada com sucesso!',
            planilha: newPlanilha,
        });
    } catch (error) {
        console.error('Erro ao carregar planilha:', error);
        res.status(500).json({ message: 'Erro ao carregar planilha', error });
    }
};


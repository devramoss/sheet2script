const { Planilha } = require('../modelos/Planilha');


exports.uploadPlanilha =  (req, res) => {
    try {
        res.json({ file: req.file });

        /*if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado.' });
        }

        const usuarioId = req.user.id;

        if (!req.file) {
            return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
        }*/

        // Salvar no banco de dados
        const newPlanilha = Planilha.create({
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


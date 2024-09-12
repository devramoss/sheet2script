const express = require("express");
const multer = require("multer");
const cors = require("cors");
const storage = require("./config/multer");
const rotaRegistro = require("./rotas/cadastro");
const rotaLogin = require("./rotas/login");
const rotaUsuario = require('./rotas/usuario');
const path = require('path');
const planilhaRoutes = require('./rotas/upload'); // Ajuste o caminho conforme a estrutura do seu projeto
const Planilha = require('./modelos/Planilha'); // Ajuste o caminho conforme a estrutura do seu projeto

const autenticarToken = require("./middleware/autenticarToken");

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // Ajuste conforme a origem do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

const upload = multer({ storage: storage });

app.use(cors(corsOptions));
app.use(express.json());
app.use("/files", express.static("uploads"));
app.use("/registro", rotaRegistro);
app.use("/login", rotaLogin);
app.use("/usuario/:id", rotaUsuario);

app.post("/upload", upload.single("file"), async(req, res) => {
    try {
        //const { caminhoArquivo, usuarioId } = req.body; // Recebe os dados do frontend

        // Cria uma nova entrada na tabela Planilha

        console.log(Planilha)

        const {usuarioId} = req.body;

        const novaPlanilha = await Planilha.create({
            caminhoArquivo: req.file.path,
            dataUpload: new Date(),
            usuarioId: usuarioId,
            
        });
        

        res.status(201).json(novaPlanilha); // Retorna a nova planilha criada

        //return res.json({ filename: req.file.filename, destination: req.file.destination });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao enviar os dados da planilha' });
    }

    
});

module.exports = app;
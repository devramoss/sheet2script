const express = require("express");
const multer = require("multer");
const cors = require("cors");
const storage = require("./config/multer");
const rotaRegistro = require("./rotas/cadastro");
const rotaLogin = require("./rotas/login");
const rotaUsuario = require('./rotas/usuario');
const path = require('path');
const planilhaRoutes = require('./rotas/upload'); // Ajuste o caminho conforme a estrutura do seu projeto

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
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    return res.json({ filename: req.file.filename });
});

module.exports = app;
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

const upload = multer({ storage: storage });
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // Ajuste conforme a origem do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use("/upload", planilhaRoutes); // Ajuste conforme a estrutura do seu projeto

app.use(express.json());

app.use("/registro", rotaRegistro);
app.use("/login", rotaLogin);
app.use("/usuario/:id", rotaUsuario);

module.exports = app;
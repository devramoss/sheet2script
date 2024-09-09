const express = require("express");
const cors = require("cors");
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
app.use(cors(corsOptions));
app.use('/uploads', autenticarToken, express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use("/registro", rotaRegistro);
app.use("/login", rotaLogin);
app.use("/usuario/:id", rotaUsuario);
app.use('/api/planilhas', planilhaRoutes);

module.exports = app;
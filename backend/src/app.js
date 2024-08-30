const express = require("express");
const rotaRegistro = require("./rotas/cadastro");
const rotaLogin = require("./rotas/login");
const rotaUsuario = require('./rotas/usuario');

const app = express();

app.use(express.json());
app.use("/registro", rotaRegistro);
app.use("/login", rotaLogin);
app.use("/usuario/:id", rotaUsuario);

module.exports = app;
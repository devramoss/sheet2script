const { Sequelize } = require('sequelize');
const dotenv = require("dotenv");

dotenv.config();
// Configurações do banco de dados
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
});

// Testando a conexão
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });

// Sincronizar o banco de dados com as alterações feitas nos modelos
sequelize.sync({ alter: true })  // A opção 'alter: true' ajusta o banco de dados para refletir o modelo
    .then(() => {
        console.log('Banco de dados sincronizado com as alterações.');
    })
    .catch(err => {
        console.error('Erro ao sincronizar o banco de dados:', err);
    });

module.exports = sequelize;
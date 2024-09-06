const mysql = require('mysql2/promise');

const dotenv = require("dotenv");

dotenv.config();


const conexao = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "projetoFinal",
    port: 3306
    
});

// Verificando se as variáveis de ambiente estão corretas
console.log("MYSQL_HOST:", process.env.MYSQL_HOST);
console.log("MYSQL_USER:", process.env.MYSQL_USER);
console.log("MYSQL_PASSWORD:", process.env.MYSQL_PASSWORD ? '****' : 'undefined');
console.log("MYSQL_DB:", process.env.MYSQL_DB);
console.log("MYSQL_PORT:", process.env.MYSQL_PORT);


module.exports = conexao;
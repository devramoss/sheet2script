const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sua configuração do banco de dados
const Usuario = require('./Usuario'); // Caminho correto para o modelo de usuário

// Definição do modelo Planilha
const Planilha = sequelize.define('planilha', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nomeArquivo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataUpload: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, // Data do upload preenchida automaticamente
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario, // Referência ao modelo de usuário
            key: 'id',
        },
        allowNull: false,
    },
}, {
    tableName: 'planilha',
    timestamps: true, // Para createdAt e updatedAt
});

// Associação entre Planilha e Usuario
Usuario.hasMany(Planilha, { foreignKey: 'usuarioId' });
Planilha.belongsTo(Usuario, { foreignKey: 'usuarioId' });

module.exports = Planilha;

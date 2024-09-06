const Usuario = require('../modelos/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const realizarLogin = async (req, res) => {
    const {email, senha} = req.body;
    
    if(!email)
        return res.status(400).json({mensagem: "O email é obrigatório!"});
    if(!senha)
        return res.status(400).json({mensagem: "A senha é obrigatória!"});

    // Verificando se o usuario existe
    const usuarioExiste = await Usuario.findOne({where: {email}});

    if(!usuarioExiste)
        return res.status(404).json({mensagem: "Usuário não encontrado!"});

    // Verificando a senha
    const verificarSenha = await bcrypt.compare(senha, usuarioExiste.senha);

    if(!verificarSenha)
        return res.status(401).json({mensagem: "Senha incorreta!"});

    try{
        const secret = "jsdajhhdajshdahdasda8723119091874@@@@";
        const token = jwt.sign(
            {id: usuarioExiste.id},
            secret,
            { expiresIn: '1h' } // Adicionando tempo de expiração
        );
        res.status(200).json({mensagem: "Autenticação realizada com sucesso!", token});
    } catch (error) {
        console.log(error);
        res.status(500).json({mensagem: "Aconteceu um erro no servidor, tente novamente mais tarde!"});
    }
}

module.exports = {
    realizarLogin
}

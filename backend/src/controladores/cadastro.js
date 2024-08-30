const db = require('../modelos/conexao');
const Usuario = require('../modelos/Usuario');
const bcrypt = require('bcrypt');

const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};


const realizarCadastro = async (req, res) => {
    const {nome, email, senha} = req.body;

    // Validações
    if(!nome)
        return res.status(402).json({mensagem: "O nome é obrigatório!"});
    if(!email)
        return res.status(402).json({mensagem: "O email é obrigatório!"});
    if(!senha)
        return res.status(402).json({mensagem: "A senha é obrigatória!"});
    
    if(!validarEmail(email))
        return res.status(402).json({mensagem: "O email é inválido!"});

    // Verifica se o usuário já existe

    const usuarioExiste = await Usuario.findOne({where: {email}});

    if(usuarioExiste)
        return res.status(422).json({mensagem: "Usuário já cadastrado! Por favor, use outro e-mail"});

    // Criptografar a senha
    const salt = await bcrypt.genSalt(12);
    const hashSenha = await bcrypt.hash(senha, salt);

    // Cadastrar o usuário
    const usuario = await Usuario.create({
        nome,
        email,
        senha: hashSenha
    });
    
    try{
        await usuario.save();
        res.send('Cadastro efetuado com sucesso!');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    realizarCadastro
}
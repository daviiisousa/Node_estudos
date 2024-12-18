const { validationResult } = require("express-validator");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const {registrarNaBlacklist} = require('../middleware/authMiddleware')

// GET Todos os usuários que estao ativo
const getUsuarios = async (req, res) => {
  try {
    // Consultar apenas usuários ativos
    const usuariosAtivos = await db.query(
      "SELECT * FROM usuarios WHERE active = $1",
      [true]
    );

    if (usuariosAtivos.rows.length === 0) {
      return res
        .status(404)
        .json({ mensagem: "Nenhum usuário ativo encontrado" });
    }

    res.status(200).json(usuariosAtivos.rows);
  } catch (error) {
    console.error("Erro ao buscar os usuários:", error);
    res.status(500).send("Erro no servidor");
  }
};

const usuariosInativos = async (req, res) => {
  try {
    const usuariosInativos = await db.query(
      "SELECT * FROM usuarios WHERE active = $1",
      [false]
    );
    if (usuariosInativos.rows.length === 0) {
      return res.status(404).send("nenhum usuario inativo encontrado");
    }
    res.status(200).json({
      mensagem: "usuarios inativos",
      inativos: usuariosInativos.rows,
    });
  } catch (error) {
    console.error("Erro ao buscar usuario", error);
    res.status(500).send("Erro no servidor");
  }
};

// GET Usuário por ID
const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await db.query("SELECT * FROM usuarios WHERE id = $1", [
      id,
    ]);

    if (usuario.rows.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    //verifica se usuario esta como desativado 
    if (usuario.rows[0].active === false) {
      res.status(400).json({ mensagem: "voce esta desativado" });
    } else {
      res
        .status(200)
        .json({ mensagem: "Usuário encontrado", usuario: usuario.rows[0] });
    }
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).send("Erro no servidor");
  }
};

// POST Criar um novo usuário
const createUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    //faz uma validaçao se existe um erro nos dados enviado do corpo e o devolve
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //deixar a senha criptografada
    const hash = await bcrypt.hash(senha, 8);

    // Inserir no banco de dados
    const usuarioCriado = await db.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, hash]
    );

    res.status(201).json({
      mensagem: "Usuário criado com sucesso",
      usuario: usuarioCriado.rows[0],
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res
      .status(500)
      .json({ mensagem: "erro ao criar o usuario", erro: error.detail });
  }
};

// DELETE Usuário por ID
const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioExistente = await db.query(
      "SELECT * FROM usuarios WHERE id = $1",
      [id]
    );

    if (usuarioExistente.rows.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const usuarioDeletado = await db.query(
      "UPDATE usuarios SET active = $1 WHERE id = $2 RETURNING *",
      [false, id]
    );

    res.status(200).json({
      mensagem: `Usuário desativado com sucesso`,
      usuario: usuarioDeletado.rows[0],
    });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).send("Erro no servidor");
  }
};

// PUT Atualizar usuário por ID
const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    //faz uma validaçao se existe um erro nos dados enviado do corpo e o devolve
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Hash apenas se a senha for fornecida
    const senhaHasheada = senha ? await bcrypt.hash(senha, 8) : null;

    const usuario = await db.query(
      `UPDATE usuarios 
         SET 
           nome =  $1,
           email = $2,
           senha = $3
         WHERE id = $4 
         RETURNING *`,
      [nome, email, senhaHasheada, id]
    );

    if (usuario.rows.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.status(200).json({
      mensagem: "Usuário atualizado com sucesso",
      usuario: usuario.rows[0],
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).send("Erro no servidor");
  }
};

const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    //retorna um array do nosso banco de dados
    const resultado = await db.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );
    //aqui a gente pega esse array e acessa o abjeto dele por ser so um ele entende q ele esta no indice 0
    const usuario = resultado.rows[0];

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    // Comparar a senha enviada com o hash armazenado
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Senha incorreta" });
    }

    if (usuario.active === false) {
      return res.status(400).json({ mensagem: "voce esta desativado" });
    }
    //gera o token 
    const token = jwt.sign({id:usuario.id, nome: usuario.nome, email: usuario.email}, process.env.SECRET_KEY, {expiresIn: '1h'})
    res.status(200).json({
      mensagem: "Login bem-sucedido",
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).send("Erro no servidor");
  }
};

const logoutUsuario = (req, res) => {
  //aqui a gente vai no cabecalho da requisao e pega o token
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ mensagem: "Token não fornecido" });
  }
  //aqui a gente alimenta a black list
  registrarNaBlacklist(token);

  res.status(200).json({ mensagem: "Logout realizado com sucesso" });
};


module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  deleteUsuario,
  updateUsuario,
  loginUsuario,
  usuariosInativos,
  logoutUsuario
};

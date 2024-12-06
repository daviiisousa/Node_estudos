const db = require("../config/db");
const bcrypt = require("bcrypt");

async function gerarHashSenha(senha) {
  const saltRounds = 10; // Número de rodadas de processamento
  const hash = await bcrypt.hash(senha, saltRounds);
  return hash;
}

// GET Todos os usuários
const getUsuarios = async (req, res) => {
  try {
    const usuario = await db.query("SELECT * FROM usuarios");
    if (usuario.rows.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum usuário encontrado" });
    }
    res.status(200).json(usuario.rows);
  } catch (error) {
    console.error("Erro ao buscar os usuários:", error);
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

    res
      .status(200)
      .json({ mensagem: "Usuário encontrado", usuario: usuario.rows[0] });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).send("Erro no servidor");
  }
};

// POST Criar um novo usuário
const createUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const senhaHasheada = await gerarHashSenha(senha);

    // Inserir no banco de dados
    const usuarioCriado = await db.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, senhaHasheada]
    );

    res.status(201).json({
      mensagem: "Usuário criado com sucesso",
      usuario: usuarioCriado.rows[0],
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).send("Erro no servidor");
  }
};

// DELETE Usuário por ID
const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioDeletado = await db.query(
      "DELETE FROM usuarios WHERE id = $1 RETURNING *",
      [id]
    );

    if (usuarioDeletado.rows.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.status(200).json({
      mensagem: "Usuário deletado com sucesso",
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

    // Hash apenas se a senha for fornecida
    const senhaHasheada = senha ? await gerarHashSenha(senha) : null;

    const usuario = await db.query(
      `UPDATE usuarios 
         SET 
           nome = COALESCE($1, nome),
           email = COALESCE($2, email),
           senha = COALESCE($3, senha)
         WHERE id = $4 
         RETURNING *`,
      [nome, email, senhaHasheada, id]
    );

    if (usuario.rows.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res
      .status(200)
      .json({
        mensagem: "Usuário atualizado com sucesso",
        usuario: usuario.rows[0],
      });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).send("Erro no servidor");
  }
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  deleteUsuario,
  updateUsuario,
};
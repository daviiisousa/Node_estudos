const express = require("express");
const app = express();
app.use(express.json());
const { body, validationResult } = require("express-validator");

const db = require("./src/config/db");

const validarUsuario = [
  body("nome")
    .notEmpty()
    .withMessage("o campo nome nao pode ser vazil")
    .trim()
    .escape(),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("o campo nome esta incoreto"),
  body("senha")
    .isLength({ min: 6 })
    .withMessage("o campo senha deve ter no minimo 6 caracteres"),
];

// GET Todos os usuários
app.get("/usuarios", async (_req, res) => {
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
});

// GET Usuário por ID
app.get("/usuarios/:id", async (req, res) => {
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
});

// POST Criar um novo usuário
app.post("/usuarios", validarUsuario, async (req, res) => {
  try {
    // Checar os erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nome, email, senha } = req.body;

    // Inserir no banco de dados
    const usuarioCriado = await db.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, senha]
    );

    res.status(201).json({
      mensagem: "Usuário criado com sucesso",
      usuario: usuarioCriado.rows[0],
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).send("Erro no servidor");
  }
});

// DELETE Usuário por ID
app.delete("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioDeletado = await db.query(
      "DELETE FROM usuarios WHERE id = $1 RETURNING *",
      [id]
    );

    if (usuarioDeletado.rows.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.status(204).json({
      mensagem: "Usuário deletado com sucesso",
      usuario: usuarioDeletado.rows[0],
    });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).send("Erro no servidor");
  }
});

app.put("/usuario/:id", validarUsuario, async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const usuario = await db.query(
      "UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *",
      [nome, email, senha, id]
    );
    if (usuario.rows.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    res
      .status(200)
      .json({ mensagem: "sucesso ao atualizar", usuario: usuario.rows[0] });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).send("Erro no servidor");
  }
});

// Start do servidor
app.listen(3000, () => {
  console.log("API rodando na porta 3000");
});

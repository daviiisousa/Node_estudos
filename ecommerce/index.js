const express = require('express');
const app = express();
const { Pool } = require('pg');

app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'usuario',
  password: '2710',
  port: 5432,
});

app.get('/usuario', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios'); // Consulta todos os usuários do banco
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

app.post('/login', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Insere um novo usuário na tabela `usuarios`
    const result = await pool.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, senha]
    );

    const usuario = result.rows[0]; // Retorna o usuário inserido
    console.log(usuario)
    res.status(201).json(usuario);
  } catch (err) {
    console.error('Erro ao inserir usuário:', err);
    res.status(500).json({ error: 'Erro ao inserir usuário' });
  }
});

app.listen(3000, () => {
  console.log(`Rodando na porta 3000`);
});

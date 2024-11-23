const pool = require("../config/config");

// Funções para lidar com o banco de dados
const getAllProdutos = async () => {
  const result = await pool.query("SELECT * FROM produtos_tecnologicos");
  return result.rows;
};

const getProdutoById = async (id) => {
  const result = await pool.query("SELECT * FROM produtos_tecnologicos WHERE id = $1", [id]);
  return result.rows[0];
};

const createProduto = async (nome, descricao, preco, estoque, categoria) => {
  const result = await pool.query(
    "INSERT INTO produtos_tecnologicos (nome, descricao, preco, estoque, categoria) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [nome, descricao, preco, estoque, categoria]
  );
  return result.rows[0];
};

const updateProduto = async (id, descricao) => {
  const result = await pool.query(
    "UPDATE produtos_tecnologicos SET descricao = $1 WHERE id = $2 RETURNING *",
    [descricao, id]
  );
  return result.rows[0];
};

const deleteProduto = async (id) => {
  const result = await pool.query(
    "DELETE FROM produtos_tecnologicos WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

module.exports = { getAllProdutos, getProdutoById, createProduto, updateProduto, deleteProduto };

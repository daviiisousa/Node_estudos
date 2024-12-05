const db = require("../config/config");
const ProdutosModel = require("../models/productsModel");

class ProdutosService {
  async getAll() {
    const result = await db.query("SELECT * FROM produtos_tecnologicos");
    return result.rows;
  }

  async getById(id) {
    const result = await db.query("SELECT * FROM produtos_tecnologicos WHERE id = $1", [id]);
    return result.rows[0];
  }

  async create(data) {
    const produto = new ProdutosModel(
      data.nome,
      data.descricao,
      data.preco,
      data.estoque,
      data.categoria
    );
    const result = await db.query(
      "INSERT INTO produtos_tecnologicos (nome, descricao, preco, estoque, categoria) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [produto.nome, produto.descricao, produto.preco, produto.estoque, produto.categoria]
    );
    // return result.rows[0];
  }

  async update(id, data) {
    const result = await db.query(
      "UPDATE produtos_tecnologicos SET descricao = $1 WHERE id = $2 RETURNING *",
      [data.descricao, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    const result = await db.query(
        "DELETE FROM produtos_tecnologicos WHERE id = $1 RETURNING *",
        [id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
}

}

module.exports = new ProdutosService();

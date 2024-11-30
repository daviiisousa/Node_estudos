const db = require("../config/config");
const FruitModel = require("../models/fruitsModel");

class FruitService {
  async getAll() {
    const result = await db.query("SELECT * FROM frutas");
    return result.rows;
  }

  async getById(id) {
    const result = await db.query("SELECT * FROM frutas WHERE id = $1", [id]);
    return result.rows[0];
  }

  async create(data) {
    const produto = new FruitModel(
      data.nome,
      data.cor,
      data.peso,
      data.estoque,
      data.preco
    );
    const result = await db.query(
      "INSERT INTO frutas (nome, cor, peso, estoque, preco) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [produto.nome, produto.cor, produto.peso, produto.estoque, produto.preco]
    );
    return result.rows[0];
  }
}

module.exports = new FruitService()
const ProdutosService = require("../service/ProdutosService");

class ProdutosController {
  async getAll(req, res) {
    try {
      const produtos = await ProdutosService.getAll();
      res.status(200).json(produtos);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      res.status(500).send("Erro no servidor");
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const produto = await ProdutosService.getById(id);
      if (!produto) {
        return res.status(404).json({ mensagem: "Produto não encontrado" });
      }
      res.status(200).json(produto);
    } catch (error) {
      console.error("Erro ao buscar produto por ID:", error);
      res.status(500).send("Erro no servidor");
    }
  }

  async create(req, res) {
    try {
      const novoProduto = await ProdutosService.create(req.body);
      res.status(201).json(novoProduto);
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      res.status(500).send("Erro no servidor");
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const produtoAtualizado = await ProdutosService.update(id, req.body);
      if (!produtoAtualizado) {
        return res.status(404).json({ mensagem: "Produto não encontrado" });
      }
      res.status(200).json(produtoAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      res.status(500).send("Erro no servidor");
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const produtoRemovido = await ProdutosService.delete(id);
      if (!produtoRemovido) {
        return res.status(404).json({ mensagem: "Produto não encontrado" });
      }
      res.status(200).json({ mensagem: "Produto deletado", produto: produtoRemovido });
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      res.status(500).send("Erro no servidor");
    }
  }
}

module.exports = new ProdutosController();

const produtosModel = require("../models/productsModel");

const getAll = async (req, res) => {
  try {
    const produtos = await produtosModel.getAllProdutos();
    res.status(200).json(produtos);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).send("Erro no servidor");
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await produtosModel.getProdutoById(id);
    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }
    res.status(200).json(produto);
  } catch (error) {
    console.error("Erro ao buscar produto por ID:", error);
    res.status(500).send("Erro no servidor");
  }
};

const create = async (req, res) => {
  try {
    const { nome, descricao, preco, estoque, categoria } = req.body;
    const novoProduto = await produtosModel.createProduto(nome, descricao, preco, estoque, categoria);
    res.status(201).json(novoProduto);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).send("Erro no servidor");
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao } = req.body;
    const produtoAtualizado = await produtosModel.updateProduto(id, descricao);
    if (!produtoAtualizado) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }
    res.status(200).json(produtoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).send("Erro no servidor");
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const produtoRemovido = await produtosModel.deleteProduto(id);
    if (!produtoRemovido) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }
    res.status(200).json({ mensagem: "Produto deletado", produto: produtoRemovido });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).send("Erro no servidor");
  }
};

module.exports = { getAll, getById, create, update, remove };

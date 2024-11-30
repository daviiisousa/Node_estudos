class ProdutosModel {
  constructor(nome, descricao, preco, estoque, categoria) {
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.estoque = estoque;
    this.categoria = categoria;
  }
}

module.exports = ProdutosModel;

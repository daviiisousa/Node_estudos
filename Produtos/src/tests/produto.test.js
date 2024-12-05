const ProdutoService = require("../service/ProdutosService");

jest.mock("../config/config", () => ({
  query: jest.fn(),
}));

const mockProdutos = [
  { id: 1, nome: "Produto Teste" },
  { id: 2, nome: "Produto 2" },
  { id: 3, nome: "produto 3" },
];

const pool = require("../config/config");

describe("ProdutoService", () => {
  it("deve retornar um produto pelo ID", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockProdutos] });

    const produto = await ProdutoService.getById(1);
    expect(produto).toEqual(mockProdutos);
    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM produtos_tecnologicos WHERE id = $1",
      [1]
    );
  });

  it("deve retornar todos os produtos", async () => {
    pool.query.mockResolvedValueOnce({ rows: mockProdutos });

    const produtos = await ProdutoService.getAll();
    expect(produtos).toEqual(mockProdutos);
    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM produtos_tecnologicos"
    );
  });

  it("deve deletar um item", async () => {
    // Mock do item a ser deletado
    const mockProduto = { id: 1, nome: "Produto Teste" };

    // Simula a resposta do banco ao executar o DELETE
    pool.query.mockResolvedValueOnce({ rows: [mockProduto] });

    // Chama a função que será testada
    const resultado = await ProdutoService.delete(1);

    // Verifica se o retorno da função é o esperado
    expect(resultado).toEqual(mockProduto);

    // Verifica se a query foi chamada corretamente
    expect(pool.query).toHaveBeenCalledWith(
      "DELETE FROM produtos_tecnologicos WHERE id = $1 RETURNING *",
      [1]
    );
  });

''

});

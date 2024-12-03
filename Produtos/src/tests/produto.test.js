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
    // Definir o mock como uma lista de objetos

    pool.query.mockResolvedValueOnce({ rows: mockProdutos });

    const produtos = await ProdutoService.getAll();
    expect(produtos).toEqual(mockProdutos);
    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM produtos_tecnologicos"
    );
  });

  it("deve deletar um item", async () => {

    const produto = await ProdutoService.delete(id)
  });
});

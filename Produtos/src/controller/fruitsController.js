const FruitService = require("../service/FruitService");

class FruitController {
  async getAll(req, res) {
    try {
      const frutas = await FruitService.getAll();
      res.status(200).json(frutas);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      res.status(500).send("Erro no servidor");
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const frutas = await FruitService.getById(id);
      if (!frutas) {
        return res.status(404).json({ mensagem: "Produto não encontrado" });
      }
      res.status(200).json(frutas);
    } catch (error) {
      console.error("Erro ao buscar produto por ID:", error);
      res.status(500).send("Erro no servidor");
    }
  }

  async create(req, res) {
    try {
      const novaFruta = await FruitService.create(req.body);
      res.status(201).json(novaFruta);
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      res.status(500).send("Erro no servidor");
    }
  }

  async delete(req, res){
    try {
      const {id} = req.params
      const frutaDeletada = await FruitService.delete(id)
      if(!frutaDeletada){
        return res.status(404).json({messagem: "Produto nao encontrado"})
      }
      res.status(204).send()
    } catch (error) {
      console.error("erro ao deletar", error)
      res.status(500).send("erro no servidor")
    }
  }

  async atualizar(req, res){
    try {
      const {id} = req.params
      const frutaAtualizada = await FruitService.atualizar(id)
    } catch (error) {
      
    }
  }
  
}

module.exports = new FruitController();

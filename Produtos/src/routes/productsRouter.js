const express = require("express");
const ProdutosController = require("../controller/productsController");

const router = express.Router();

router.get("/", ProdutosController.getAll);
router.get("/:id", ProdutosController.getById);
router.post("/", ProdutosController.create);
router.put("/:id", ProdutosController.update);
router.delete("/:id", ProdutosController.delete);

module.exports = router;

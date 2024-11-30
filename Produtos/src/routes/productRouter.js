const express = require("express");
const router = express.Router();

const ProdutosController = require("../controller/productsController");


router.get("/", ProdutosController.getAll);
router.get("/:id", ProdutosController.getById);
router.post("/", ProdutosController.create);
router.put("/:id", ProdutosController.update);
router.delete("/:id", ProdutosController.delete);



module.exports = router;

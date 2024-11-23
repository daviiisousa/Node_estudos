const express = require("express");
const produtosController = require("../controller/productsController");

const router = express.Router();

router.get("/", produtosController.getAll);
router.get("/:id", produtosController.getById);
router.post("/", produtosController.create);
router.put("/:id", produtosController.update);
router.delete("/:id", produtosController.remove);

module.exports = router;

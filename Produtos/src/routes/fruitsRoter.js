const express = require("express");
const router = express.Router();

const FruitController = require('../controller/fruitsController')

router.get("/", FruitController.getAll);
router.get("/:id", FruitController.getById);
router.post("/", FruitController.create);
router.delete("/:id", FruitController.delete)

module.exports = router;
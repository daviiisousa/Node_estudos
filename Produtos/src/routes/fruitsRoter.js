const express = require("express");
const router = express.Router();

const FruitController = require('../controller/fruitsController')

router.get("/", FruitController.getAll);
router.get("/:id", FruitController.getById);
router.post("/", FruitController.create);

module.exports = router;
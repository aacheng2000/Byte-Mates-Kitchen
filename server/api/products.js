const router = require("express").Router();
const {
  models: { Product, Fun, Theme },
} = require("../db");
module.exports = router;

//Display all products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [Fun, Theme],
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

//Display single product
router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.productId },
      include: [Fun, Theme],
    });
    res.send(product);
  } catch (err) {
    next(err);
  }
});

//Edit single product
router.put("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    const editedProduct = await product.update(req.body);
    res.send(editedProduct);
  } catch (err) {
    next(err);
  }
});

//Create single product
router.post("/api/products", async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (err) {
    next(err);
  }
});

//Delete single product
router.delete("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    await product.destroy();
    res.send(product);
  } catch (error) {
    next(error);
  }
});

//Display Forks
router.get("/:fork", async (req, res, next) => {
  try {
    const fun = await Product.findOne({
      where: { funId: req.params.funId },
      include: [Fun, Theme],
    });
    res.send(fun);
  } catch (err) {
    next(err);
  }
});

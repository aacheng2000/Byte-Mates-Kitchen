const router = require("express").Router();
const {
  models: { Product, Fun, Theme },
} = require("../db");
module.exports = router;

// // Display all products for guest carts
// router.get("/cartproducts", async (req, res, next) => {
//   try {
//     const products = await Product.findAll({
//       include: [Fun, Theme],
//     });
//     res.json(products);
//   } catch (err) {
//     next(err);
//   }
// });

//Paignation

router.get("/fullCatalog", async (req, res, next) => {
  try {
    const products = await Product.findAll({})
    res.send(products)
  } catch (error) {
    next(error)
  }
})

router.get("/:idx?", async (req, res, next) => {
  try {
    const pageSize = process.env.PAGE_SIZE || 8;

    const idx = req.params.idx * 1 ? req.params.idx * 1 : 0;
    
    const [total, products] = await Promise.all([
      Product.count(),
      Product.findAll({
        limit: pageSize,
        offset: pageSize * idx,
        include: [Fun, Theme],
      }),
    ]);
    res.send({
      total,
      products,
    });
  } catch (err) {
    next(err);
  }
});

//Display single product
router.get("/singleproduct/:productId", async (req, res, next) => {
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


//Display Knives
router.get("/category/knives", async (req, res, next) => {
  try {
    const fun = await Product.findAll({
      where: { funId: 1 },
    });
    res.send(fun);
  } catch (err) {
    next(err);
  }
});

//Display Forks
router.get("/category/forks", async (req, res, next) => {
  try {
    const fun = await Product.findAll({
      where: { funId: 2 },
    });
    res.send(fun);
  } catch (err) {
    next(err);
  }
});

//Display Spoons
router.get("/category/spoons", async (req, res, next) => {
  try {
    const fun = await Product.findAll({
      where: { funId: 3 },
    });
    res.send(fun);
  } catch (err) {
    next(err);
  }
});

//Display holidays and gifts
router.get("/theme/holidaysgifts", async (req, res, next) => {
  try {
    const fun = await Product.findAll({
      where: { themeId: 1 },
    });
    res.send(fun);
  } catch (err) {
    next(err);
  }
});

//Display BBQ
router.get("/theme/bbq", async (req, res, next) => {
  try {
    const fun = await Product.findAll({
      where: { themeId: 2 },
    });
    res.send(fun);
  } catch (err) {
    next(err);
  }
});

//Display Birthdays
router.get("/theme/birthdays", async (req, res, next) => {
  try {
    const fun = await Product.findAll({
      where: { themeId: 3 },
    });
    res.send(fun);
  } catch (err) {
    next(err);
  }
});

//Display Date Nights
router.get("/theme/datenights", async (req, res, next) => {
  try {
    const fun = await Product.findAll({
      where: { themeId: 4 },
    });
    res.send(fun);
  } catch (err) {
    next(err);
  }
});

//Display Date Nights
router.get("/theme/sale", async (req, res, next) => {
  try {
    const fun = await Product.findAll({
      where: { themeId: 5 },
    });
    res.send(fun);
  } catch (err) {
    next(err);
  }
});

//Edit single product
router.put("/singleproduct/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    const editedProduct = await product.update(req.body);
    res.send(editedProduct);
  } catch (err) {
    next(err);
  }
});

//Create single product
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (err) {
    next(err);
  }
});

//Delete single product
router.delete("/singleproduct/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    await product.destroy();
    res.send(product);
  } catch (error) {
    next(error);
  }
});

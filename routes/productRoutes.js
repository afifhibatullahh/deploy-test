const express = require("express");
const router = express.Router();
const Joi = require("joi");
const productControllers = require("../controllers/product");

const validator = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");
const paginationMiddleware = require("../middleware/pagination");
const validationImage = require("../middleware/image");

const productSchema = Joi.object({
  name: Joi.string().required().label("Nama barang"),
  salesPrice: Joi.number().required().label("Harga jual"),
  purchasePrice: Joi.number().required().label("Harga beli"),
  stock: Joi.number().required().label("Stok"),
});

router.post(
  "/",
  auth,
  validationImage,
  validator.body(productSchema),
  productControllers.create
);

router.get("/", paginationMiddleware(10), auth, productControllers.products);

router.get("/:id", auth, productControllers.read);

router.put("/:id", auth, validationImage, productControllers.update);

router.delete("/:id", auth, productControllers.destroy);

module.exports = router;

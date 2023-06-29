const Product = require("../../models/product");

const products = async (req, res) => {
  try {
    const { startIndex, page } = req.pagination;
    const filterSearch = {
      name: { $regex: req.query.search || "", $options: "i" },
    };

    const [products, total] = await Promise.all([
      Product.find(filterSearch).skip(startIndex).limit(10),
      Product.find(filterSearch).count(),
    ]);

    if (products.length)
      return res.status(200).json({
        products,
        total: total,
        currentPage: page,
        nextPage: page * 10 < total ? page + 1 : false,
      });
    else
      return res.status(200).json({
        products,
        message: "Tidak ada produk",
      });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const create = async (req, res) => {
  try {
    const { name, purchasePrice, salesPrice, stock } = req.body;

    const productExists = await Product.exists({ name });
    if (productExists) {
      return res.status(409).send({
        message: "Barang sudah dibuat",
      });
    }

    let uploadFile = req.files.image;
    const imageName = uploadFile.name;
    const saveAs = `  ${imageName}`;

    const pathImage = `assets/images/${saveAs}`;

    uploadFile.mv(pathImage, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      const product = Product.create({
        name,
        image: pathImage,
        purchasePrice,
        salesPrice,
        stock,
      });

      res.status(201).json({
        product: {
          _id: product._id,
          name,
          image,
          purchasePrice,
          salesPrice,
          stock,
        },
      });
    });
  } catch (error) {
    return res.status(500).send("Error :", error.message);
  }
};

const read = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).exec();
    if (!product) {
      return res.status(409).send({
        message: "Produk tidak ditemukan",
      });
    }
    res.status(201).json({
      product: {
        product,
      },
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const productExists = await Product.findOne({
      name: req.body.name,
      _id: { $ne: id },
    });
    if (productExists) {
      return res.status(400).json({ error: "Nama produk sudah terpakai" });
    }
    const product = await Product.findByIdAndUpdate(id, req.body);
    res.status(201).json({
      product,
      message: "product updated",
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const destroy = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(201).json({
      product,
      message: "product deleted",
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { create, read, products, update, destroy };

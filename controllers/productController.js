const validateToken = require("../middleware/validate-jwt");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const router = require("express").Router();
const { Product, Admin, Image } = require("../models");

router.post("/create", validateToken, async (req, res) => {
  let message;
  const {
    title,
    description,
    category,
    price,
    property,
    value,
    property2,
    value2,
    subCategory,
    sale,
    discount,
    images
  } = req.body;
  console.log("images",req.body.images)

  try {
    let u = await Admin.findOne({ where: { id: req.user.id } });
    console.log(u)
    if (!u) return;
    let newProduct = await u.createProduct({
      title,
      description,
      category,
      price,
      property,
      value,
      property2,
      value2,
      subCategory,
      sale,
      discount,
    });
    await u.addProduct(newProduct);
    console.log(newProduct);

    let product = await Product.findOne({ where: { title: title }});

    console.log("here's the product", product)

    if (!product) return;

    if (images && images.length > 0){
      const newImages = await Image.bulkCreate(images);
      await product.addImage(newImages);
    }


    message = {
      message: "Product successfully created",
      data: newProduct,
    };
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      message = {
        message: "Product creation failed, expected unique product name",
      };
    } else {
      message = {
        message: `Product creation failed ${err}`,
      };
    }
  }

  console.log("message", message)
  return res.json(message);
});

router.get("/all-products", async (req, res) => {
  let message;

  try {
    const products = await Product.findAll();
    
    //this is letting me know that Products is actually being called
    res.send(products);
  } catch (err) {
    message = { message: "Products could not be founds", err };
  }
});

router.put("/:id", validateToken, async (req, res) => {
  let message;
  const { id } = req.user;
  const productId = req.params.id;
  const {
    title,
    description,
    category,
    price,
    property,
    value,
    property2,
    value2,
    subCategory,
    sale,
    discount,
  } = req.body;

  const query = {
    where: {
      id: productId,
    },
    returning: true,
  };
  const data = {
    title,
    description,
    category,
    price,
    property,
    value,
    property2,
    value2,
    subCategory,
    sale,
    discount,
  };
  try {
    const updateProduct = await Product.update(data, query);
    message = {
      message: "Product successfully updated",
      data: { updateProduct, query },
    };
  } catch (err) {
    message = {
      message: "Could not update entry",
      data: null,
    };
  }
  res.json(message);
});

router.delete("/:id", validateToken, async (req, res) => {
  const { id } = req.user;
  const productId = req.params.id;
  let message;
  try {
    const response = await Product.destroy({
      where: {
        id: productId,
      },
    });
    message = { message: "Product has been deleted" };
  } catch (err) {
    message = { message: "Failed to Delete" };
  }
  res.json(message);
});

module.exports = router;

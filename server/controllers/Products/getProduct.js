const Product = require("../../models/Product/product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products) {
      return res.status(200).json(products);
    } else {
      return res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    console.log("Error getting products", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productID } = req.params;
    const product = await Product.findOne({ ProductId: productID });
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error getting product", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category: category });
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
    return res.status(200).json(products);
  } catch (error) {
    console.log("Error getting products", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getAllProducts, getProductById, getProductsByCategory;

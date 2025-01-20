const Product = require("../../models/Product/product");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, photo, ProductId } = req.body;
    if (!name || !description || !price || !category || !photo ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Generate  unique ProductId
    const generateUniqueId = async () => {
      let unique = false;
      let productId;
      while (!unique) {
        productId =
          category.slice(0, 3).toUpperCase() + Math.floor(Math.random() * 1000);
        const product = await Product.findOne({ ProductId: productId });
        if (!product) {
          unique = true;
        }
      }
      return productId;
    };
    const productId = await generateUniqueId();
    const product = new Product({
      name,
      description,
      price,
      category,
      photo,
      ProductId: productId,
    });

    await product.save();

    return res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.log("error creating product", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = createProduct;

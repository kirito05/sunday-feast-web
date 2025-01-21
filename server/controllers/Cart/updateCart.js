const User = require("../../models/Customers/user");
const AnCart = require("../../models/Anonymous/AnCart");
const jwt = require("jsonwebtoken");

const updateCartItems = async (req, res) => {
  try {
    const { ProductId, quantity } = req.body;
    const token = req.headers.authorization;
    const sessionId = req.sessionID;
    if (!token && !sessionId) {
      return res.status(400).json({ message: "Invalid Request" });
    }
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userID = decoded.id;
      await User.updateOne(
        { _id: userID, "Cart.ProductId": ProductId },
        { $set: { "Cart.$.Quantity": quantity } }
      );
      return res.status(200).json({ message: "Cart updated successfully" });
    } else {
      const sessionID = req.sessionID;
      if (!sessionID) {
        return res.status(404).json({ message: "No session found" });
      }
      await AnCart.updateOne(
        { sessionId: sessionID, "cartItems.productId": ProductId },
        { $set: { "cartItems.$.quantity": quantity } }
      );

      return res.status(200).json({ message: "Cart updated successfully" });
    }
  } catch (error) {
    console.log("Error updating the cart items",error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = updateCartItems;

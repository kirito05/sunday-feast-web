const User = require("../../models/Customers/user");
const Product = require("../../models/Product/product")
const AnCart = require("../../models/Anonymous/AnCart");





const AddToCart = async (req, res) => {
  try {
    const {ProductId, quantity} = req.body;

    const token = req.headers.authorization;
    const sessionId = req.sessionID;
     if(!token && !sessionId){
      return res.status(400).json({message:"Invalid Request"});
    }

    if(token){
      const userID = req.userID;
      const user = await User.findById(userID);
      if(!user){
        return res.status(404).json({message:"User Not Found"});
      }
      user.Cart.push({
        ProductId:ProductId,
        Quantity:quantity
      })
      await user.save();
      return res.status(200).json({message:"Product added to cart successfully"});
    }
    else{
      const sessionID = req.sessionID;
      if(!sessionID){
        return res.status(404).json({message:"No session found"});
      }
      const anCart = await AnCart.findOne({sessionId:sessionID});
      if(!anCart){
        const newCart = new AnCart({
          sessionId:sessionID,
          cartItems:[{
            productId:ProductId,
            quantity:quantity
          }]
        })
        await newCart.save();
        return res.status(200).json({message:"Product added to cart successfully"});
      }
      else{
        anCart.cartItems.push({
          productId:ProductId,
          quantity:quantity
        })
        await anCart.save();
        return res.status(200).json({message:"Product added to cart successfully"});
      }
    }
  
  } catch (error) {
    console.log("Error adding product to cart", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = AddToCart;

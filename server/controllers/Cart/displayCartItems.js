const User = require('../../models/Customers/user');
const AnCart = require('../../models/Anonymous/AnCart');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const getCartItems = async (req , res)=>{
    try {
    //     const {ProductId} = req.body;
    // if(!ProductId){
    //     return res.status(400).json({message:"ProductId is required"});
    // }
    const token = req.headers['authorization'];
    const sessionId = req.sessionID;
    if(!token && !sessionId){
        return res.status(400).json({message:"Invalid Request"});
    }
    if(token){
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const UserId = decoded.UserId;
        const {CartItems} = await User.findOne({_id:UserId},{Cart:1,_id:0});
        if(!CartItems){
            return res.status(400).json({message:"No items in cart"});
        }
        res.status(200).json({CartItems});
    }
    else{
        if(!sessionId){
            return res.status(404).json({message:"No session found"});
        }
        const {CartItems} = await AnCart.findOne({sessionId:sessionId},{Cart:1,_id:0});
        if(!CartItems){
            return res.status(400).json({message:"No items in cart"});
        }
        res.status(200).json({CartItems});
    }
        
    } catch (error) {
        console.log("Error in getCartItems",error);
        return res.status(500).json({message:"Internal server error"});
        
    }
    
}

module.exports = getCartItems;
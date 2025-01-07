const User = require('../../models/Customers/user');


const userRegister = async(req,res)=>{
    try {
        const {Name,PhoneNumber} = req.body;
        const UserExist = await User.findOne({PhoneNumber:PhoneNumber});
        if(UserExist){
            return res.status(400).json({message:"User already exists"});
        }
        const newUser = new User({
            Name,
            PhoneNumber
        });

        

        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }

}

module.exports = userRegister;
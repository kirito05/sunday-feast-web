const User = require('../../../models/Customers/user');
const sendOtp = require('../../../utils/sendOtp');




const RegisterOtp = async(req,res)=>{
    try {
        const {PhoneNumber} = req.body;
        const UserExist = await User.findOne({PhoneNumber:PhoneNumber});
        if(UserExist){
            return res.status(400).json({message:"User already exists"});
        }
        await sendOtp(PhoneNumber);

        res.status(200).json({message:"Otp sent to the mobile number "});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }

}

module.exports = RegisterOtp;
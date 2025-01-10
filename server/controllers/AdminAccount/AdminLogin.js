const Member = require('../../models/Admin/member')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const redis = require('redis')





const AdminLogin = async (req,res)=>{
    try {
        const {AdminId,Password} = req.body

        const doesAdminIdExits = await Member.findOne({AdminId:AdminId})
        if(!doesAdminIdExits){
            res.status(404).json({message:"Admin Id does not exist!! Please Check the AdminId"})
        }
        const decode = bcrypt.compare(Password,doesAdminIdExits.Password)
        if(!decode){
            res.status(401).json({message:"Invalid Password"})

        }
        const AdminToken = jwt.sign({id: doesAdminIdExits._id},process.env.ADMIN_JWT_SECRET,{expiresIn:"10m"})
        res.status(200).json({
            message:"User Logged In Successfully"
        })
        
    } catch (error) {
        
    }

}

module.exports = AdminLogin
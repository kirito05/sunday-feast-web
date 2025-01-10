const masterKeyValidation = (req,res,next)=>{

    const {masterKey} = req.body
    if(masterKey && masterKey === process.env.MASTER_ID){
        return next()
    }
    res.status(403).json({
        message:"You are not permitted for this action"
    })

}

module.exports = masterKeyValidation
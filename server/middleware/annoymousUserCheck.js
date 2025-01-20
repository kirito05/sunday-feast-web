const {v4: uuidv4} = require('uuid');



const AnonymousUserCheck =  (req,res,next) => {
  try{
    const token = req.headers.authorization;
    const sessionId = req.sessionID;


    if(token){
      return next();
    }
    
    if(req.sessionID){
      console.log("Session ID",req.sessionID);
      return next();
    }

    req.sessionID = uuidv4();
    console.log("new session id ",req.sessionID);
    return next() 
  }
  catch(error){
    console.log("Error in Anonymous User Check",error);
    return res.status(500).json({message:"Internal server error"});
  }
}

module.exports = AnonymousUserCheck;
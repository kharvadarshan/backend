
const JWT = require('jsonwebtoken');
const { tokenSignature } = require('../utils/global');


exports.auth = (req,res,next)=>{
    const token = req.session.token;
    if(req.path==='/logout')
    {
        next();
    }else{
    try {
       const decodedToken = JWT.verify(token,tokenSignature);
    }catch(error)
    {  
            res.redirect('/user/login');
    }
     
    }
   
}
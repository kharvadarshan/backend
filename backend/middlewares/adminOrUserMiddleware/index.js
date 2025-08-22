

exports.isAdminOrUser=async(req,res,next)=>{
   try{
     const authHeader = req.header('Authorization');
     const token = authHeader && authHeader.startsWith('Bearer ')
       ? authHeader.split(' ')[1]
       : null;

     if (!token) {
       return res.status(401).json({ message: 'Not authenticated' }); 
     }

     const jwt = require('jsonwebtoken');
     const { tokenSignature } = require('../../utils/global');
     const decoded = jwt.verify(token, tokenSignature);
     req.user = decoded;

     if(decoded?.role !== 'admin' && decoded?.role !== 'user')
     {
          return res.status(403).json({ message: 'Forbidden' }); 
     }
        next();
     
   }catch(error)
   {
        console.error('Admin middleware error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired" });
    }
    res.status(500).json({ message: "Internal server error" });
   }
}
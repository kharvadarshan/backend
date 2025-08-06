const JWT = require('jsonwebtoken');
const { tokenSignature } = require('../../utils/global');
const User = require('../../model/user');

exports.isAdmin = async (req, res, next) => {
  try {
    
    console.log(req.session);
    // Check session first
    if (req.session?.user?.role !== 'admin') {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

// exports.isAdmin = (req,res,next)=>{
    
//     if(req.user?.role != 'admin'){
//         return res.status(403).json({message:"Access restricted to doctors only."});
//     }
//     next();
// }


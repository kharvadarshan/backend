const JWT = require('jsonwebtoken');
const { tokenSignature } = require('../../utils/global');
const User = require('../../model/user');

exports.isAdmin = async (req, res, next) => {
  try {
    // Check session first
    if (req.session?.user?.role === 'admin') {
      return next();
    }

    // If no session, check token
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = JWT.verify(token, tokenSignature);
    
    // Verify user exists and is admin
    const user = await User.findById(decoded.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: "Access restricted to admins only" });
    }

    // Attach user to request
    req.user = user;
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


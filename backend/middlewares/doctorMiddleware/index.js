const jwt = require('jsonwebtoken');
const { tokenSignature } = require('../../utils/global');

exports.isDoctor = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const decoded = jwt.verify(token, tokenSignature);
    req.user = decoded;

    if (decoded?.role !== 'doctor') {
      return res.status(403).json({ message: 'Access restricted to docter only.' });
    }

    next();
  } catch (error) {
    console.error('Docter middleware error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};







// const JWT = require('jsonwebtoken');
// const { tokenSignature } = require('../../utils/global');
// const User = require('../../model/user');

// exports.isDoctor = async (req, res, next) => {
//   try {
//     // Check session first
//     if (req.session?.user?.role === 'doctor') {
//       return next();
//     }

//     // If no session, check token
//     const token = req.cookies.token;
//     if (!token) {
//       return res.status(401).json({ message: "Authentication required" });
//     }

//     const decoded = JWT.verify(token, tokenSignature);
    
//     // Verify user exists and is admin
//     const user = await User.findById(decoded.id);
//     if (!user || user.role !== 'doctor') {
//       return res.status(403).json({ message: "Access restricted to admins only" });
//     }

//     // Attach user to request
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error('Doctor middleware error:', error);
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ message: "Invalid token" });
//     }
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ message: "Token expired" });
//     }
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.isDoctor = (req,res,next)=>{
//     if(req.user?.role != 'doctor'){
//         return res.status(403).json({message:"Access restricted to doctors only."});
//     }
//     next();
// }


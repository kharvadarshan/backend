

exports.isDoctorOrUser = async (req, res, next) => {
  try {
    // Check session first
    if (req.session?.user?.role === 'doctor' || req?.session?.user?.role === 'user') {
      return next();
    }

    // If no session, check token
    // const token = req.cookies.token;
    // if (!token) {
    //   return res.status(401).json({ message: "Authentication required" });
    // }

    // const decoded = JWT.verify(token, tokenSignature);
    
    // // Verify user exists and is admin
    // const user = await User.findById(decoded.id);
    // if (!user || user.role !== 'doctor') {
    //   return res.status(403).json({ message: "Access restricted to admins only" });
    // }

    // // Attach user to request
    // req.user = user;
    // next();
    return res.status(403).json({ message: "Access restricted to doctor only" });
  } catch (error) {
    console.error('Doctor middleware error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
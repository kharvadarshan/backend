

exports.isAdminOrUser=async(req,res,next)=>{
   try{
    if(req.session?.user?.role === 'admin' || req.session?.user?.role === 'user')
    {
        return next();
    }
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const decoded = JWT.verify(token, tokenSignature);
    const user = await User.findById(decoded.id);
        if (!user || user.role !== 'admin') {
          return res.status(403).json({ message: "Access restricted to admins only" });
        }
         req.user = user;
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
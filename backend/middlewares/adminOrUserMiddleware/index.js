

exports.isAdminOrUser=async(req,res,next)=>{
   try{

    if(req.session?.user?.role !== 'admin' && req.session?.user?.role !== 'user')
    {
         return res.status(401).json({ message: 'Not authenticated' }); 
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
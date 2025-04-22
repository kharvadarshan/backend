

exports.isDoctor = (req,res,next)=>{
    if(req.user?.role != 'doctor'){
        return res.status(403).json({message:"Access restricted to doctors only."});
    }
    next();
}


const User = require('../../model/user');


exports.getUserDetailsById = async(req,res)=>{
    try{

        const {id}=req.body;
        const result = await User.find({_id:id});
        res.status(201).json({ok:true,result:result});

    }catch(error)
    {
        res.status(500).json({ message: 'Internal server error' });
    }
}


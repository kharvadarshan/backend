const User = require('../../model/user');

exports.editProfile = async(req,res)=>{

    try{
        const user = req.body;
        console.log(req.body);

        if(req.file)
        {
            user.image = `/uploads/${req.file.filename}`;
        }
        const result = await User.updateOne({_id:user._id},{$set:user});
        if(result.modifiedCount>0){
            res.status(201).json({ok:true,message:"Profile updated successfully."});
          }else{
                res.status(200).json({ok:false,message:"No changes were made."})
          }

    }catch(error)
    {
        res.status(500).json({ message: 'Error while updating doctor profile.',error });  
    }
}


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


const User = require('../../model/user');
const AppointmentModel = require('../../model/appointment');

exports.editProfile = async(req,res)=>{

    try{
        const {id,name,email} = req.body;
        const updateData = {name,email};
        if(req.file)
        {
            updateData.image =`${process.env.API_URL}/uploads/${req.file.filename}`;
        }
        const result = await User.updateOne({_id:id},{$set:updateData});
        console.log(result.modifiedCount);
        if(result.modifiedCount>0){
            res.status(201).json({ok:true,message:"Profile updated successfully.",image:updateData.image});
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

exports.viewReport = async(req,res)=>{
    try
    {
        const {appointmentId}=req.params;

        const appointment = await AppointmentModel.findOne({
            _id:appointmentId
        });

        if(!appointment)
        {
            return res.status(400).json({ok:false,message:'Appointment not found.'});
        }

        const reports = (appointment.report).map((report)=>({
            fileName:report.fileName,
            uploadAt:report.uploadAt,
            url:`${req.protocol}://${req.get('host')}${report.filePath}`,
        }))
       
       return res.status(201).json({ok:true,reports:reports});

    }catch(error)
    {
        res.status(500).json({ error: error.message });
    }
}
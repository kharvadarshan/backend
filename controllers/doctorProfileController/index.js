const TimeSlot = require('../../model/timeSlot');
const Doctor = require('../../model/doctor');
const Appointment = require('../../model/appointment');


exports.addTimeSlot = async (req,res)=>{
    try{

       const  {doctorId,date,slot}= req.body; 

       const isoDate = `${date}T00:00:00.000Z`;

       const transformedSlots = slot.map((s) => {
        const startIso = `${date}T${s.start}:00.000Z`; 
        const endIso = `${date}T${s.end}:00.000Z`;    
        return {
          start:startIso,
          end: endIso,
          status: s.status,
        };
      });
      console.log(doctorId,isoDate,transformedSlots);

       const timeSlots = new TimeSlot({doctorId:doctorId,date:isoDate,slot:transformedSlots});
       await timeSlots.save();
       res.status(201).json({message:'Time Slot added successfully..', ok:true});

    }catch(error)
    {
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getAvailableTimeSlots = async(req,res)=>{
     try{
        const {_id}=req.body;
        const results = await TimeSlot.find({doctorId:_id});
        if (!results || results.length === 0) {
            return res.status(404).json({ ok: false, message: 'No time slots found for the given doctor ID.' });
        }
        res.status(201).json({ ok:true,result:results});

     }catch(error)
     {
        res.status(500).json({ message: 'Error while fetching available time slots.',error });
     }
}

exports.getDoctorById = async(req,res)=>{
    try{
          const {email }=req.body;
          const result = await Doctor.find({contact:email});
          res.status(201).json({ok:true,result:result});
    }catch(error)
    {
        res.status(500).json({ message: 'Error while fetching available time slots.',error });  
    }
}

exports.acceptAppointment = async(req,res)=>{
    try{
        const {id}=req.body;
        const result = await  Appointment.updateOne({
            _id:id
        },{
            $set:{status:"Confirmed"}
        });

        if(result.modifiedCount > 0)
        {
            res.status(201).json({ok:true,message:"Requeste accepted successfully."});
        }
        else
        {
            res.status(200).json({ok:false,message:"No chnaes were made."});
        }
    }catch(error)
    {
        res.status(500).json({ message: 'Error while fetching available time slots.',error });  
    }
}

exports.rejectAppointment = async(req,res)=>{
    try{
        const {id}=req.body;
        const result = await  Appointment.updateOne({
            _id:id
        },{
            $set:{status:"Rejected"}
        });

        if(result.modifiedCount > 0)
        {
            res.status(201).json({ok:false,message:"Request rejected successfully."});
        }
        else
        {
            res.status(200).json({ok:true,message:"No changes were made."});
        }
    }catch(error)
    {
        res.status(500).json({ message: 'Error while rejecting appointment request.',error });  
    }
}

exports.markCompleted = async(req,res)=>{
    try{
           const {id}=req.body;
           const result = await Appointment.updateOne({
             _id:id
           },{
             $set:{status:"Completed"}
           });

           if(result.modifiedCount>0)
           {
             res.status(201).json({ok:true,message:"Appointment marked to completed successfully."})
           }else{
            res.status(200).json({ok:false,message:"No chnages were made"});
           }
    }catch(error)
    {

    }
}

exports.editProfile = async(req,res)=>{
    try{
          const formData= req.body;
          console.log(req.body);
          if(req.file)
          {
            formData.image = `/uploads/${req.file.filename}`;
            console.log(formData);
          }
          const result = await Doctor.updateOne({_id:formData._id},{$set:formData});
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
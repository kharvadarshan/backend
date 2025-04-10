const TimeSlot = require('../../model/timeSlot');
const Doctor = require('../../model/doctor');
const Appointment = require('../../model/appointment');


exports.addTimeSlot = async (req,res)=>{
    try{
      const {doctorId,slot}= req.body;
     

       const isoDate = `${slot.date}T00:00:00.000Z`;
       const transformedSlots =  {
          start:slot.startTime,
          end: slot.endTime,
        }
      
       const timeSlots = new TimeSlot({doctorId:doctorId,date:isoDate,slot:[transformedSlots]});
       await timeSlots.save();
       res.status(201).json({message:'Time Slot added successfully..', ok:true});

    }catch(error)
    {
        res.status(500).json({ message: 'Internal server error' });
    }
}
exports.addManyTimeSlot = async(req,res)=>{
    try
    {
        const {doctorId,dates,slot}=req.body;

        if (!doctorId || !dates || !slot || !slot.start || !slot.end) {
            return res.status(400).json({ ok: false, message: "Missing required fields" });
          }

          const timeSlots = dates.map((date) => ({
            doctorId,
            date: new Date(`${date}T00:00:00.000Z`),
            slot: [{ start: slot.start, end: slot.end }],
          }));

          const result = await TimeSlot.insertMany(timeSlots, { ordered: false });
    
          return res.status(201).json({message:'Time Slot added successfully..', ok:true});

    }catch(error)
    {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getAvailableTimeSlots = async(req,res)=>{
     try{
        const {id}=req.params;
        const results = await TimeSlot.find({doctorId:id});
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
        const {id}=req.params;
        const result = await  Appointment.updateOne({
            _id:id
        },{
            $set:{status:"Confirmed"}
        });

        console.log(result);

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
        const {id}=req.params;
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
           const {id}=req.params;
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
          if(req.file)
          {
            formData.image = `/uploads/${req.file.filename}`;
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
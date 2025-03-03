const TimeSlot = require('../../model/timeSlot');


exports.addTimeSlot = async (req,res)=>{
    try{

       const  {doctorId,date,slot}= req.body; 
       console.log(req.body);
       const timeSlots = new TimeSlot({doctorId,date,slot});
       await timeSlots.save();
       res.status(201).json({message:'Time Slot added successfully..', ok:true});

    }catch(error)
    {
        res.status(500).json({ message: 'Internal server error' });
    }
}
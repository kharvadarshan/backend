const TimeSlot = require('../../model/timeSlot');
const Doctor = require('../../model/doctor');

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
          const result = await Doctor.find({contact:email})
    }catch(error)
    {
        res.status(500).json({ message: 'Error while fetching available time slots.',error });  
    }
}
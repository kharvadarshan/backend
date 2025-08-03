const TimeSlot = require('../../model/timeSlot');
const Doctor = require('../../model/doctor');
const Appointment = require('../../model/appointment');
const User=require('../../model/user');
const { default: mongoose } = require('mongoose');
const AppointmentModel = require('../../model/appointment');
const nodemailer=require('nodemailer');
const env=require('dotenv');
env.config();
const transporter = nodemailer.createTransport({
   service:"gmail",
   auth :{
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
   } 
});

exports.addTimeSlot = async (req,res)=>{
    try{
      const {doctorId,slot}= req.body;
     

       const isoDate = `${slot.date}T00:00:00.000Z`;
       const transformedSlots =  {
          start:slot.startTime,
          end: slot.endTime,
        }
      
       const timeSlots = new TimeSlot({doctorId:doctorId,date:isoDate,slot:transformedSlots});
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
            slot: { start: slot.start, end: slot.end },
          }));

          const result = await TimeSlot.insertMany(timeSlots, { ordered: false });
    
          return res.status(201).json({message:'Time Slot added successfully..', ok:true});

    }catch(error)
    {
        return res.status(500).json({ message: 'Internal server error' });
    }
}


exports.getTimeSlots = async(req,res)=>{
    try
    {

        const { doctorId,date }=req.body;
       
       if(!mongoose.Types.ObjectId.isValid(doctorId) || !date)
       {
           return res.status(400).json({ok:false,message:"Doctor id and date field is required"});
       }

       const isoDate = `${date}T00:00:00.000Z`;
        const results = await TimeSlot.find({doctorId,date:isoDate,"slot.isDelete":false});

        if (!results || results.length === 0) {
            return res.status(201).json({ ok: false, message: 'No time slots found for the given doctor ID.',result:results });
        }
        
        return res.status(201).json({ok:true,result:results});
             
    }catch(error)
    {
        return res.status(500).json({ message: 'Internal server error' });
    }
}


exports.deleteTimeSlot = async(req,res)=>{
    try
    {
          const {doctorId,id} = req.query;
             console.log(req.query);

          const results = await TimeSlot.updateOne( 
            { 
                doctorId:doctorId,
                "slot._id":id,
            },
            {
               $set:{
                "slot.$.isDelete":true
               }
            }
          );

          if(results.modifiedCount>0)
          {
            return res.status(201).json({ok:true,message:"Time slot deleted successfully."});
          }

    }catch(error)
    {
        return res.status(500).json({ message: 'Internal server error' });
    }
}



exports.getAvailableTimeSlots = async(req,res)=>{
     try{
        const {id}=req.params;
        const results = await TimeSlot.find({doctorId:id,"slot.isDelete":false});
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

exports.getDoctor = async(req,res)=>{
    try{
          const {id}=req.params;
          const result = await Doctor.findOne({_id:id});
          res.status(201).json({ok:true,result:result});
    }catch(error)
    {
        res.status(500).json({ message: 'Error while fetching available time slots.',error });  
    }
}



exports.acceptAppointment = async(req,res)=>{
    const session= await mongoose.startSession();
    try{
         session.startTransaction();

        const {id}=req.params;
        const existingAppointment = await Appointment.findOne({_id:id}).session(session);

        if(!existingAppointment || !existingAppointment.paymentStatus==="Completed")
        { 
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({ ok: false, message: "Appointment not found or unauthorized" });
        }
        
      
        const user = await User.findOne({_id:existingAppointment.patientId}).session(session);
        

        if(!user)
        {   
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({ ok: false, message: "User not found." });
        }


        const result1 = await TimeSlot.updateOne(
            {
                _id:existingAppointment.timeSlot,
                 doctorId:existingAppointment.doctorId,
                "slot._id":existingAppointment.slot
             },{   
             $set:{
                "slot.$.status":"Booked",
                "slot.$.appointmentId":id
             }
            },{session} );


        if(result1.modifiedCount === 0)
        {  
            await session.abortTransaction();
            session.endSession();
              return res.status(200).json({ok:false,message:"Time slot status is not changed."});
        }


        const result = await  Appointment.updateOne({
            _id:id
        },{
            $set:{status:"Confirmed"}
        },{ session}
       );


        if(result.modifiedCount === 0)
        { 
            await session.abortTransaction();
            session.endSession();
           return  res.status(200).json({ok:false,message:"No chnaes were made."});
        }


            const mailOptions = {
                from:process.env.EMAIL_USER,
                to:user.email,
                subject:"Appointment Confirmation",
                text:`Hii, Your appointment with ${existingAppointment.doctor} is successfully confirmed on ${existingAppointment.date}. Nice to see you on BookMyDoctor.`
            }
             await transporter.sendMail(mailOptions);
            await session.commitTransaction();
            session.endSession();
           return res.status(201).json({ok:true,message:"Requeste accepted successfully."});
        
    }catch(error)
    {   
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: 'Error while fetching available time slots.',error });  
    }
};


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
        res.status(500).json({ error: error.message });
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

exports.uploadReport =async(req,res)=>{

    try
    {
        const files=req.files;
        const {appointmentId}=req.params;

        if (!files || files.length === 0) {
            return res.status(400).json({ ok: false, message: "No files uploaded" });
          }

          const appointment = await AppointmentModel.findOne({
            _id: appointmentId,
          });


          if (!appointment) {
            return res
              .status(403)
              .json({ ok: false, message: "Appointment not found or unauthorized" });
          }
        
          const newReports = files.map((file) => ({
            filePath: `/uploads/${file.filename}`,
            fileName: file.originalname,
            uploadedAt: new Date(),
          }));
      
          const result = await AppointmentModel.updateOne(
            { _id: appointmentId },
            {
              $push: { report: { $each: newReports } },
            }
          );

          if (result.modifiedCount === 0) {
            return res.status(400).json({ ok: false, message: "Failed to update appointment" });
          }

          return res.status(200).json({ ok: true, message: "Reports uploaded successfully" });
    

    }catch(error)
    {
        return res.status(500).json({ message: 'Error while updating doctor profile.',error });  
    }

}
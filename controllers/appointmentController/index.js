const mongoose = require("mongoose");
const AppointmentModel = require("../../model/appointment");
const TimeSlot =require('../../model/timeSlot');
const Feedback = require('../../model/feedback');
// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
  const { doctor,patientId, date, time ,timeSlot,slot,doctorId ,patientForm} = req.body;
   console.log(req.body);
    if (!doctor || !date || !time || !slot|| !patientId || !patientForm ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    // const [month,day,year]= date.split('/');
    // const parsedDate = new Date(`${year}-${month}-${day}`)
    const newAppointment = new AppointmentModel({ doctor:doctor,patientId, date,timeSlot, time,slot,doctorId,patientForm });
    // const updateTimeSlot = await TimeSlot.updateOne(
    //                         { doctorId:doctorId,'slot._id':slot },
    //                         { $set:{'slot.$.status':"Booked"}}
    //                       );
    const savedAppointment = await newAppointment.save();
    res.status(201).json({ok:true,appointment:savedAppointment});
    // if(updateTimeSlot.modifiedCount > 0){
    //   res.status(201).json(savedAppointment);
    // }else
    // {
    //   res.status(400).json({ok:false,message:'No changes made to the slot status.'})
    // }
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};





exports.getAllAppointmentsByDoctorId= async(req,res)=>{
  try
  {
    const {id} = req.params;
    const today = new Date();
    today.setHours(0,0,0,0);

    const upcomingAppointments = await AppointmentModel.find({
      doctorId:id,
      $and:[
      {date: { $gt: today}},
      {status: { $eq: "Pending" }} 
      ]
    }).sort({date:1});
    

    const completedAppointments = await AppointmentModel.find({
       doctorId:id,
       $and: [
        // {date:{ $lt:today}},
        {status: {$eq:'Completed'}},
        {
          isDeleted:false
        }
       ],
    }).sort({date:-1});

    const rejectedAppointments = await AppointmentModel.find({
      doctorId:id,
      status:"Rejected"
    }).sort({date:-1});

    const confirmedAppointment = await AppointmentModel.find({
      doctorId:id,
      status:"Confirmed"
    }).sort({date:-1});

    const result = await AppointmentModel.find({doctorId:id}).sort({ createdAt:-1});

    if (!result || result.length === 0) {
      return res.status(404).json({message : "Appointment not Found."})
    }
    res.status(201).json(
      {  
        ok: true,
        result:result,
        upcomingAppointments:upcomingAppointments,
        completedAppointments:completedAppointments,
        rejectedAppointments:rejectedAppointments,
        confirmedAppointment:confirmedAppointment
      });

  }catch(error)
  {
    res.status(500).json({ error: error.message });
  }
}


exports.getAllAppointmentsByPatientId= async(req,res)=>{
  try
  {
    const {id}=req.params;
    const result = await AppointmentModel.find({patientId:id,isDeleted:false}).sort({ createdAt:-1});
    if (!result || result.length === 0) {
      return res.status(404).json({message : "Appointment not Found."})
    }
    res.status(201).json({ok: true,result:result});

  }catch(error)
  {
    res.status(500).json({ error: error.message });
  }
}

exports.getDeletedAppointmentsByPatientId= async(req,res)=>{
  try
  {
    const {id}=req.params;
    const result = await AppointmentModel.find({patientId:id,isDeleted:true}).sort({ createdAt:-1});
    if (!result || result.length === 0) {
      return res.status(404).json({message : "Appointment not Found."})
    }
    res.status(201).json({ok: true,result:result});

  }catch(error)
  {
    res.status(500).json({ error: error.message });
  }
} 

exports.deleteAppointment = async(req,res)=>{
   try{
       const {appointmentId}=req.params;
       
       const existingAppointment = await AppointmentModel.findById(appointmentId);
       if(!existingAppointment)
       {
        res.status(404).json({ok:flase,message:"Appointmnet not found."});
       }

       const result = await AppointmentModel.updateOne({_id:appointmentId,status:"Completed"},{$set:{isDeleted:true}});

       if(result.modifiedCount>0)
       {
           res.status(201).json({ok:true,message:"Appointment deleted successfully!"});
       }else
       {
           res.status(400).json({ok:false,message:"Appoinment is incomplete"});
       }
   }catch(error)
   {
    res.status(500).json({ error: error.message });
   }
};


exports.giveFeedback = async(req,res)=>{
  try
  {

    const {appointmentId,rating,feedback} = req.body;
     console.log(req.body);
    
     if (!mongoose.Types.ObjectId.isValid(appointmentId) || !rating || !feedback) {
      return res.status(400).json({ ok: false, message: "Missing required fields" });
    }


     const appointment = await AppointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ ok: false, message: "Appointment not found" });
    }

    if (appointment.feedbackForm?.rating) {
      return res.status(403).json({ ok: false, message: "Feedback already submitted" });
    }

    const updateAppointment = await AppointmentModel.updateOne(
      {  _id:appointmentId },
      { $set:{
          "feedbackForm.rating": rating,
          "feedbackForm.feedback": feedback,
          "feedbackForm.createdAt": new Date(),
         } 
       });

       if(updateAppointment.modifiedCount>0)
       {
        return res.status(201).json({ok:true,message:"feed given successfully."});
       }else{
        return res.status(400).json({ok:false,message:"No changes were made."});
       }
  }catch(error)
  {
      return res.status(500).json({error:error.message});
  }
}







exports.bookAppointment = async (req, res) => {
  const appointmentData = req.body;

  try {
    // Check if the slot is available
    const slot = await TimeSlot.findById(appointmentData.slotId);
    if (!slot || slot.status === "Booked") {
      return res.status(400).json({ ok: false, message: "Selected slot is not available" });
    }

    // Create the appointment
    const appointment = new Appointment({
      ...appointmentData,
      slotId: slot._id, // Link to TimeSlot
    });
    const savedAppointment = await appointment.save();

    // Mark the slot as booked
    slot.status = "Booked";
    slot.appointmentId = savedAppointment._id;
    await slot.save();

    res.status(201).json({ ok: true, message: "Appointment booked successfully", appointment: savedAppointment });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ ok: false, message: "Server error" });
  }
};
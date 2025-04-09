const mongoose = require("mongoose");
const AppointmentModel = require("../../model/appointment");
const TimeSlot =require('../../model/timeSlot');
const Feedback = require('../../model/feedback');
// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
  const { doctor,patientId, date, time ,slot,doctorId ,patientForm} = req.body;
   console.log(req.body);
    if (!doctor || !date || !time || !slot|| !patientId || !patientForm ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    // const [month,day,year]= date.split('/');
    // const parsedDate = new Date(`${year}-${month}-${day}`)
    const newAppointment = new AppointmentModel({ doctor:doctor,patientId, date, time,slot,doctorId,patientForm });
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


exports.getAllAppointments= async(req,res)=>{
  try
  {
    const result = await AppointmentModel.find({}).sort({ createdAt:-1});

    if (!result || result.length === 0) {
      return res.status(404).json({message : "Appointment not Found."})
    }
    res.status(201).json({Ok: true,result:result});

  }catch(error)
  {
    res.status(500).json({ error: error.message });
  }
}


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
        {date:{ $lt:today}},
        {status: {$eq:'Completed'}},
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
    console.log(id);
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
       console.log(appointmentId);
       

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

    const {doctorId,userId,rating,feedback} = req.body;
    const newFeedback = new Feedback({doctorId,useId,rating,feedback});

    const savedFeedback = await newFeedback.save();

    res.status(201).json({ok:true,savedFeedback:savedFeedback});
 
  }catch(error)
  {
      res.status(500).json({error:error.message});
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
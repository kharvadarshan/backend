const mongoose = require("mongoose");
const AppointmentModel = require("../../model/appointment");
const TimeSlot =require('../../model/timeSlot');
// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { doctor,patientId, date, time, reason ,slot,doctorId } = req.body;
   console.log(req.body);
    // Validate required fields
    if (!doctor || !date || !time || !reason || !patientId || !mongoose.Types.ObjectId.isValid(slot)) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    const [month,day,year]= date.split('/');
    const parsedDate = new Date(`${year}-${month}-${day}`)
    const newAppointment = new AppointmentModel({ doctor,patientId, date:parsedDate, time, reason });
    const updateTimeSlot = await TimeSlot.updateOne(
                            { doctorId:doctorId,'slot._id':slot },
                            { $set:{'slot.$.status':"Booked"}}
                          );
    const savedAppointment = await newAppointment.save();
    if(updateTimeSlot.modifiedCount > 0){
      res.status(201).json(savedAppointment);
    }else
    {
      res.status(400).json({ok:false,message:'No changes made to the slot status.'})
    }
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
    const {name} = req.body;
    const today = new Date();
    today.setHours(0,0,0,0);

    const upcomingAppointments = await AppointmentModel.find({
      doctor:name,
      date: { $gt: today},
      status: { $ne: "Completed"} 
    }).sort({date:1});
    

    const completedAppointments = await AppointmentModel.find({
       doctor:name,
       $and: [
        {date:{ $lt:today}},
        {status: 'Completed'},
       ],
    }).sort({date:-1});

    const result = await AppointmentModel.find({doctor:name}).sort({ createdAt:-1});

    if (!result || result.length === 0) {
      return res.status(404).json({message : "Appointment not Found."})
    }
    res.status(201).json({ok: true,result:result,upcomingAppointments:upcomingAppointments,completedAppointments:completedAppointments});

  }catch(error)
  {
    res.status(500).json({ error: error.message });
  }
}


exports.getAllAppointmentsByPatientId= async(req,res)=>{
  try
  {
    const {email} = req.body;
     console.log(req.body);

    const result = await AppointmentModel.find({patientId:email}).sort({ createdAt:-1});
 console.log(result);
    if (!result || result.length === 0) {
      return res.status(404).json({message : "Appointment not Found."})
    }
    res.status(201).json({ok: true,result:result});

  }catch(error)
  {
    res.status(500).json({ error: error.message });
  }
}
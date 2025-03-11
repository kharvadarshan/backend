const mongoose = require("mongoose");
const AppointmentModel = require("../../model/appointment");

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { doctor,patientId, date, time, reason } = req.body;

    // Validate required fields
    if (!doctor || !date || !time || !reason || !patientId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Ensure the doctor ID is valid
    if (!mongoose.Types.ObjectId.isValid(doctor) || !mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ error: "Invalid doctor ID" });
    }

    const newAppointment = new AppointmentModel({ doctor,patientId, date, time, reason });
    const savedAppointment = await newAppointment.save();

    res.status(201).json(savedAppointment);
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
    const {id} = req.body;

    const result = await AppointmentModel.find({doctor:id}).sort({ createdAt:-1});

    if (!result || result.length === 0) {
      return res.status(404).json({message : "Appointment not Found."})
    }
    res.status(201).json({ok: true,result:result});

  }catch(error)
  {
    res.status(500).json({ error: error.message });
  }
}


exports.getAllAppointmentsByPatientId= async(req,res)=>{
  try
  {
    const {id} = req.body;
    console.log(req.body);

    const result = await AppointmentModel.find({patientId:id}).sort({ createdAt:-1});

    if (!result || result.length === 0) {
      return res.status(404).json({message : "Appointment not Found."})
    }
    res.status(201).json({ok: true,result:result});

  }catch(error)
  {
    res.status(500).json({ error: error.message });
  }
}
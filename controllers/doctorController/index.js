

const mongoose = require('mongoose');
const Doctor = require('../../model/doctor'); // Adjust the path as needed

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    console.log(doctors);
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single doctor by ID
// exports.getDoctorById = async (req, res) => {
//   try {
//     const doctor = await Doctor.findById(req.params.id);

//     console.log(doctor);
//     if (!doctor) {
//       return res.status(404).json({ message: 'Doctor not found' });
//     }
//     res.status(200).json(doctor);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const doctor = await Doctor.findById(id);
    
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error fetching doctor details:", error);
    res.status(500).json({ error: error.message });
  }
};

// Create a new doctor
exports.createDoctor = async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a doctor by ID
exports.updateDoctor = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a doctor by ID
exports.deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
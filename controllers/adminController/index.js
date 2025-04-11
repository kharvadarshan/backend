const mongoose = require("mongoose");
const contactModel = require("../../model/contact");
const AppointmentModel=require("../../model/appointment");
const Doctor=require('../../model/doctor');
const User = require('../../model/user');

exports.gettingContact = async (req, res) => {
  try {
    const data = await contactModel.find({});
    console.log(data);
    return res.status(200).json(Array.isArray(data) ? data : []); // Ensure array
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

exports.delettingContact = async (req, res) => {
    try {
        const id  = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Contact ID" });
        }

        const contact = await contactModel.findById(id);
        if (!contact) {
            return res.status(404).json({ message: "Contact Not Found" });
        }

        await contactModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Contact Deleted Successfully" });

    } catch (error) {
        console.error("Error in delete contact: Backend", error);
        return res.status(500).json({ message: "Internal Server Error" });
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

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    return res.status(200).json(doctors);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// Get all patients

exports.getAllPatient = async(req,res)=>{
  try
  {
      const patients = await User.find({});
      return res.status(201).json({ok:true,patients:patients});
  }catch(error)
  {
    return res.status(500).json({ error: error.message });
  }
}

// Block user

exports.blockUser=async(req,res)=>{
  try
  {
       const {id}=req.params;
       console.log(id);

       const updateUser = await User.updateOne(
        {_id:id},
        { $set:
          {isBloked:true}
         }
      );

      if(updateUser.modifiedCount>0)
      {
        return res.status(201).json({ok:true,message:"User blocked successfully."});
      }else
      {
        return res.status(400).json({ok:false,message:"No changes were made."});
      }
  }catch(error)
  {
    return res.status(500).json({ error: error.message });
  }
}



exports.unblockUser=async(req,res)=>{
  try
  {
       const {id}=req.params;

       const updateUser = await User.updateOne(
        {_id:id},
        { $set:
          {isBloked:false}
         }
      );

      if(updateUser.modifiedCount>0)
      {
        return res.status(201).json({ok:true,message:"User unblocked successfully."});
      }else
      {
        return res.status(400).json({ok:false,message:"No changes were made."});
      }
  }catch(error)
  {
    return res.status(500).json({ error: error.message });
  }
}
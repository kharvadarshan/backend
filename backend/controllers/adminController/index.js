const mongoose = require("mongoose");
const contactModel = require("../../model/contact");
const AppointmentModel=require("../../model/appointment");
const Doctor=require('../../model/doctor');
const User = require('../../model/user');
const Specialization = require("../../model/specialization");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv')

dotenv.config();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

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

exports.addDoctor = async(req,res)=>{
  try
  {  
    console.log(req.body);
    const formData=req.body;
    const generatedPassword = crypto.randomBytes(8).toString('hex');
    
    const hashedPassword = await bcrypt.hash(generatedPassword, 12);
    const doctorData = {
      ...formData,
      password: hashedPassword
    };

    const newDoctor = new Doctor(doctorData);
    const savedDoctor = await newDoctor.save();
   
   
  if(savedDoctor){
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: formData.email,
        subject: 'Your Doctor Portal Login Credentials',
        html: `
          <h2>Welcome to Our Medical Portal!</h2>
          <p>Dear Dr. ${formData.name},</p>
          <p>Your account has been successfully created.</p>
          <p><strong>Login Credentials:</strong></p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Password:</strong> ${generatedPassword}</p>
          <p><strong>Login URL:</strong> ${process.env.API_URL}/login</p>
          <br/>
          <p>Please change your password after first login.</p>
          <p>Best regards,<br/>Medical Team</p>
        `
      };

      await transporter.sendMail(mailOptions);
      
      return res.status(201).json({
        ok: true,
        doctor: savedDoctor,
        message: 'Doctor added successfully. Credentials sent via email.'
      });

    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Still return success but warn about email failure
      return res.status(201).json({
        ok: true,
        doctor: savedDoctor,
        warning: 'Doctor added but email sending failed',
        credentials: {
          email: formData.email,
          password: generatedPassword
        }
      });
    }
  }else
  {
     return res.status(400).json({ok:false});
  }

  }catch(error)
  { 
    return res.status(500).json({error:error.message});
  }
};


exports.addSpecialization =async(req,res)=>{
  try
  {

     const {name}=req.body;

     if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Specialization name is required." });
    }

    const exists = await Specialization.findOne({name});

    if(exists)
    {
      return res.status(409).json({ok:false,message:`${name} already exists.`});
    }

    const  newSpecialization = new Specialization({name:name});
    await  newSpecialization.save();

    return res.status(201).json({ok:true,message:"Specialization added successfully."});

  }catch(error)
  {
    return res.status(500).json({error:error.message});
  }
}


exports.getSpecialization= async(req,res)=>{
  try
  {
    const spec = await Specialization.find({isDeleted:false},{ name: 1, _id: 0 } );
    if(spec.length === 0)
      return res.status(404).json({ok:false,message:"Specialization not found."});

    return res.status(201).json({ok:true,specialization:spec});
  }catch(error)
  {
    return res.status(500).json({ok:false,error:error.message});
  }
};



exports.deleteSpecialization = async(req,res)=>{
  try
  {
    const {id}=req.params;

     const updateSpecialization = await Specialization.updateOne(
      {_id:id},
      {$set:{
        isDeleted:true
      }}
     );

     if(updateSpecialization.modifiedCount>0)
      {
        return res.status(201).json({ok:true,message:"User blocked successfully."});
      }else
      {
        return res.status(400).json({ok:false,message:"No changes were made."});
      }
  }catch(error)
  {
    return res.status(500).json({ok:false,error:error.message});
  }
}
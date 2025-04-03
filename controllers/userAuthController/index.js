const User = require('../../model/user');
const Doctor = require('../../model/doctor');
const JWT = require('jsonwebtoken');
const { tokenSignature } = require('../../utils/global');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const redis = require('redis');
const joi = require('joi');
const env = require('dotenv')
env.config();

const redisClient = redis.createClient();

(async ()=>{
   try{
        await redisClient.connect();
        console.log("connected");
   }catch(error)
   {
      console.error(error);
   }  
})();





const generateOTP = ()=> Math.floor(100000 + Math.random()*900000).toString();

const transporter = nodemailer.createTransport({
   service:"gmail",
   auth :{
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
   } 
});



exports.sendOTP = async(req,res) =>{
   
   try{

      const {email } = req.body;
      console.log(email);

   if(!email) {
      return res.status(400).json({message:"Email is required"});
   }

   const otp = generateOTP();
   await redisClient.setEx(email,300,otp);

   const mailOptions = {
      from:process.env.EMAIL_USER,
      to:email,
      subject:"Your OTP Code",
      text:`Your OTP code is ${otp}.It is valid for 5 minutes.`,
   };
    
   await transporter.sendMail(mailOptions);
   res.json({message:"OTP sent successfully!",ok:true});

   }catch(error)
   {
      res.status(500).json({message:"Error sending OTP",error});
   }
};


exports.verifyOTP = async(req,res)=>{
   try{
        const {email,otp} = req.body;
        console.log(email,otp);
        const storedOtp = await redisClient.get(email);
        
        if(!storedOtp || storedOtp !== otp)
        {
          res.status(400).json({message:"Invalid or expired OTP."});
        }

        await redisClient.del(email);
        res.json({message:"OTP verified successfully!",ok:true});
   }catch(error)
   {
      res.status(500).json({message:"Error during OTP verification!"});
   }
}

exports.registerUser = async (req,res)=>{
   try{
       const {userName,email,password,confirmPassword,role}=req.body;
       const hashedPassword = await bcrypt.hash(password,10);
       console.log(req.body);
       if(password == confirmPassword){
         const user = new User({userName,email,password:hashedPassword,role});
         await user.save();
            res.status(201).json({
               message: 'User registered successfully',ok:true });
       }else
       {
             res.status(400).json({ message: 'Passwords do not match' });
       }
   }catch(error)
   {
      console.error(error);
      if (error.code === 11000) {
          res.status(400).json({ message: 'Email already exists' });
     }else
     {
    res.status(500).json({ message: 'Internal server error' });
     }
         
   }
}


exports.logout = (req,res)=>{
  // console.log(req.session);
   if (req.session.user) {
      req.session.destroy((err) => {
         if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error logging out' });
         }
         res.clearCookie('connect.sid'); // Clear session cookie
         res.status(200).json({ message: 'Logged out successfully', ok: true });
      });
   } else {

      res.status(400).json({ message: 'No active session found' });
   }
}



exports.validateLogin = async (req,res)=>{
   const {email,password}=req.body;
   try{
      const userCredential = await User.findOne( {email });
      console.log(userCredential);
      if(userCredential)
      {
            const isMatch = await bcrypt.compare(password,userCredential.password);

            if(isMatch)
            {
               const token = JWT.sign(
                  { id: userCredential._id, email: userCredential.email, role: userCredential.role },
                  tokenSignature,
                  { expiresIn: '1d' }
              );
              console.log(token);
              // console.log(await Doctor.findOne({contact:email}));
              req.session.user = {
               id: userCredential._id,
               email: userCredential.email,
               name:userCredential.userName,
               role: userCredential.role,
               doctor: userCredential.role === 'doctor' ? await Doctor.findOne({contact:email}): null
              };
             
              res.status(201).json({message:'Login successfully.',ok:true,token:token,user:req.session.user})
            
            }
            else{
               res.status(500).json({message:'Password is wrong.'})
              
            }
      }
      else{
          res.status(400).json({ message: 'User Not Found.' }).redirect('/login');
     }
   }catch(error)
   {
      console.error(error);
      res.status(500).json({message:'Internal server error.'})
   }
   
}
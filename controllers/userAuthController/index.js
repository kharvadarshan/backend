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


const redisClient = redis.createClient({
   socket: {
       host: process.env.REDIS_HOSTNAME,
       port: Number(process.env.REDIS_PORT),
       reconnectStrategy: (retries) => Math.min(retries * 100, 3000),
       connectTimeout: 10000,
   },
   password: process.env.REDIS_PASSWORD
});

redisClient.on("error", (err) => {
   console.error("Redis connection error:", err);
});

redisClient.connect().then(() => {
   console.log("Connected to Redis!");
   redisClient.set("aad", "ada");
});






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
   return res.json({message:"OTP sent successfully!",ok:true});

   }catch(error)
   {
      return res.status(500).json({message:"Error sending OTP",error});
   }
};


exports.verifyOTP = async(req,res)=>{
   try{
        const {email,otp} = req.body;
        console.log(email,otp);
        const storedOtp = await redisClient.get(email);
        
        if(!storedOtp || storedOtp !== otp)
        {
          return res.status(400).json({message:"Invalid or expired OTP."});
        }

        await redisClient.del(email);
        return res.json({message:"OTP verified successfully!",ok:true});
   }catch(error)
   {
      return res.status(500).json({message:"Error during OTP verification!"});
   }
}

exports.registerUser = async (req,res)=>{
   try{
       const {userName,email,password,confirmPassword,role}=req.body;
       const hashedPassword = await bcrypt.hash(password,10);
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
      res.clearCookie('token');
      req.session?.destroy?.((err) => {
         if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error logging out' });
         }
         res.clearCookie('connect.sid'); // Clear session cookie
         res.status(200).json({ message: 'Logged out successfully', ok: true });
      });
   
}



exports.validateLogin = async (req,res)=>{
   const {email,password}=req.body;
   try{
      const userCredential = await User.findOne( {email});

      if(!userCredential)
      {
         return res.status(400).json({ok:false, message: 'User Not Found.' });
      }

      if(userCredential.isBloked)
      {
         return res.status(403).json({ok:false, message: 'User is Blocked.' });
      }
      
            const isMatch = await bcrypt.compare(password,userCredential.password);
          
            if(!isMatch)
            {
               return res.status(401).json({ok:false,message:'Invalid Credentials.'});
            }
          
            const payload = {
               id:userCredential._id,
               email:userCredential.email,
               role:userCredential.role,
            };

               const token = JWT.sign(
                  payload,
                  tokenSignature,
                  { expiresIn: '1d' }
              );

              res.cookie('token',token,{
               httpOnly:true,
               secure:process.env.NODE_ENV === 'production',
               sameSite:'strict',
               maxAge: 24*60*60*1000,
              });
             
              req.session.user = {
               id: userCredential._id,
               email: userCredential.email,
               name:userCredential.userName,
               role: userCredential.role,
               doctor: userCredential.role === 'doctor' ? await Doctor.findOne({contact:email}): null
              };

              let redirect='/';
              if (userCredential.role === 'doctor') {
               redirect = '/doctorprofile';
             } else if (userCredential.role === 'admin') {
               redirect = '/admin';
             }
       
    return  res.status(201).json({message:'Login successfully.',ok:true,token:token,user:req.session.user,redirect});   
     
   }catch(error)
   {
      return  res.status(500).json({ok:false, message:'Internal server error.',error:error.message});
   }
   
}
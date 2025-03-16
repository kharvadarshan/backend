const User = require('../../model/user');
const Doctor = require('../../model/doctor');
const JWT = require('jsonwebtoken');
const { tokenSignature } = require('../../utils/global');

const bcrypt = require('bcrypt');
exports.renderData = (req,res)=>{
   console.log("hello");
   res.send('Login successful');
};


exports.registerUser = async (req,res)=>{
   try{
       const {firstName,lastName,email,password,confirmPassword,role}=req.body;
       const hashedPassword = await bcrypt.hash(password,10);
       console.log(req.body);
       if(password == confirmPassword){
         const user = new User({firstName,lastName,email,password:hashedPassword,role});
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
   console.log(req.session);
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
               name:userCredential.firstName+" "+userCredential.lastName,
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
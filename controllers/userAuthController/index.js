const User = require('../../model/user');
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
       console.log(req.body);
       const hashedPassword = await bcrypt.hash(password,10);
       if(password == confirmPassword){
            await User.insertOne({firstName,lastName,email,password:hashedPassword,role});
            res.status(201).json({
               message: 'User registered successfully' });
       }else
       {
            return res.status(400).json({ message: 'Passwords do not match' });
       }
   }catch(error)
   {
      console.error(error);
      if (error.code === 11000) {
         return res.status(400).json({ message: 'Email already exists' });
     }
     res.status(500).json({ message: 'Internal server error' });
   }
}


exports.logout = (req,res)=>{
   req.session.destroy((err) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error logging out' });
      }

      // Redirect to the login page or home page
      res.redirect('/user/login');
  });
}



exports.validateLogin = async (req,res)=>{
   const {email,password,role}=req.body;
   console.log(req.body);

   try{
      const userCredential = await User.findOne( {email });
      console.log(userCredential);
      if(userCredential)
      {
            const isMatch = await bcrypt.compare(password,userCredential.password);

            if(isMatch)
            {
               const token = JWT.sign(
                  {email},
                  tokenSignature
              )
              console.log(token);
              req.session.token = token,
              req.session.user = userCredential
               res.redirect("/");
            }
            else{
               res.redirect("/user/login");
            }
      }
      else{
         return res.status(400).json({ message: 'User Not Found.' });
     }
   }catch(error)
   {
      console.error(error);
      res.redirect("/user/login")
   }
   
}
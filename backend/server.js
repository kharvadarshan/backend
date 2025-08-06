const express = require("express");
const mongoose = require('mongoose');
const doctorRoutes = require('./routes/renderDoctors');
const doctorProfileRoutes = require('./routes/doctorProfileRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const userAuth = require('./routes/userAuth');
const profile = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes');
const app = express();
const paymentRoute = require("./routes/paymentRoutes");
const axios=require('axios');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const multer=require('multer');
const path=require('path');
const session=require('express-session');
const MongoStore = require('connect-mongo');
const env = require('dotenv')
const bodyParser = require('body-parser');

env.config();
const PORT=process.env.PORT;
app.use(cookieParser());
app.use(
  cors({
    origin:["http://localhost:5173","http://localhost:5174","https://bookmydoctor-frontend-g4pe.onrender.com"], 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization','Set-Cookie'],
    exposedHeaders: ['Set-Cookie']
}));



    app.use(
      session({
          secret: 'dash', // Replace with a secure key
          resave: false,
          saveUninitialized: false,
          name:'connect.sid',
          cookie:{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
             sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
             maxAge: 24 * 60 * 60 * 1000, 
          },
          store:MongoStore.create({ mongoUrl: process.env.MONGODB_URL
           }),
          
      })
    )

app.use('/uploads',express.static(path.join(__dirname,'uploads')));


mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

  
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
    
   
app.use('/api',doctorRoutes);
app.use('/user',userAuth);
app.use('/doctorprofile',doctorProfileRoutes);
app.use('/appointments',appointmentRoutes)
app.use('/profile',profile);
app.use('/admin',adminRoutes);
app.use("/pay", paymentRoute);


app.get('/', (req, res) => {

  console.log(req.session.user);
  res.status(200).json({ message: 'Welcome to BookMyDoctor Backend' });
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

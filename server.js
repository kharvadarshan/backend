const express = require('express');
const mongoose = require('mongoose');
const doctorRoutes = require('./routes/renderDoctors');
const doctorProfileRoutes = require('./routes/doctorProfileRoutes');
const userAuth = require('./routes/userAuth');
const profile = require('./routes/profileRoutes');
const app = express();
const MongoStore = require('connect-mongo');
const cors=require('cors');
const session=require('express-session');
const env = require('dotenv')
env.config();
const PORT=process.env.PORT;
app.use(cors({origin:"http://localhost:5173", credentials: true,}));
app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded form data


mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

    app.use(
      session({
          secret: 'dash', // Replace with a secure key
          resave: false,
          saveUninitialized: true,
          store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/session_db' }),
          cookie: { secure: false,httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }, // Set to true if using HTTPS
      })
    )
    

app.use('/api',doctorRoutes);
app.use('/user',userAuth);
app.use('/doctorprofile',doctorProfileRoutes);
app.use('/profile',profile);
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


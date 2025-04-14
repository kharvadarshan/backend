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

const cookieParser=require('cookie-parser');
const MongoStore = require('connect-mongo');
const cors=require('cors');
const multer=require('multer');
const path=require('path');
const session=require('express-session');
const env = require('dotenv')

// ---------------------------------------------------

const http = require("http");
const socketIo = require("socket.io");


const server = http.createServer(app);

const io =  socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  console.log("User connected:", socket.id);

  socket.on("sendLocation", (location) => {
    io.emit("updateLocation", location);
  });

  socket.on("disconnect", () => {
     console.log("User disconnected:", socket.id);
  });
});


server.listen(5000, () => {
  console.log(`Server running on http://localhost:{5000}`);
});


// ---------------------------------------------------


env.config();
const PORT=process.env.PORT;
app.use(cors({origin:"http://localhost:5173", credentials: true,}));
app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded form data



app.use(cookieParser());

app.use('/uploads',express.static(path.join(__dirname,'uploads')));





mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

    app.use(
      session({
          secret: 'dash', // Replace with a secure key
          resave: false,
          saveUninitialized: false,
          cookie:{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:'strict',
            maxAge: 24 * 60 * 60 * 1000
          },
          store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/session_db' }),
      })
    )
    

app.use('/api',doctorRoutes);
app.use('/user',userAuth);
app.use('/doctorprofile',doctorProfileRoutes);
app.use('/appointments',appointmentRoutes)
app.use('/profile',profile);
app.use('/admin',adminRoutes);
app.use("/pay", paymentRoute);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

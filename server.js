const express = require('express');
const mongoose = require('mongoose');
const doctorRoutes = require('./routes/renderDoctors');
const userAuth = require('./routes/userAuth');
const app = express();
const cors=require('cors');
const session=require('express-session');

const PORT=5001;
app.use(cors());
app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded form data


mongoose.connect('mongodb://localhost:27017/onlineAppointmentBooking', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

    app.use(
      session({
          secret: 'your_secret_key', // Replace with a secure key
          resave: false,
          saveUninitialized: true,
          cookie: { secure: false }, // Set to true if using HTTPS
      })
  );

app.use('/api',doctorRoutes);
app.use('/user',userAuth);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


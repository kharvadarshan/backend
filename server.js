const express = require('express');
const mongoose = require('mongoose');
const doctorRoutes = require('./routes/renderDoctors');
const app = express();
const cors=require('cors');

const PORT=5001;
app.use(cors());
app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded form data
const renderUser= require('../Backend/routes/renderUser');

mongoose.connect('mongodb://localhost:27017/onlineAppointmentBooking', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));


app.use('/user',renderUser);
app.use('/api',doctorRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


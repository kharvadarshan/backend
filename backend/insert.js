const mongoose = require('mongoose');
const Doctor = require('./model/doctor'); // Adjust the path to your Doctor model
const dotenv = require('dotenv');
dotenv.config();
// JSON data to be inserted
const doctorsData = [
  {
    id: 1,
    name: "Dr. Ayesha Khan",
    specialty: "Cardiologist",
    specialization: "Interventional Cardiology",
    experience: "10 years",
    degree: "MD, DM Cardiology",
    fees: 1500,
    address: "123 Heart Lane, Mumbai, India",
    about: "Dr. Ayesha Khan is a renowned cardiologist with expertise in interventional cardiology. She has performed over 1000 successful angioplasties.",
    field: "Cardiology",
    contact: "ayesha.khan@example.com",
    image: "../../../public/assets/doctor.png",
  },
  {
    id: 2,
    name: "Dr. Raj Mehta",
    specialty: "Dermatologist",
    specialization: "Cosmetic Dermatology",
    experience: "8 years",
    degree: "MD, Dermatology",
    fees: 1200,
    address: "456 Skin Street, Delhi, India",
    about: "Dr. Raj Mehta specializes in cosmetic dermatology and has helped hundreds of patients achieve flawless skin.",
    field: "Dermatology",
    contact: "raj.mehta@example.com",
    image: "../../../public/assets/doctor.png",
  },
  // Add the rest of the doctors here...
];


// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    // Insert data into the database
    return Doctor.insertMany(doctorsData);
  })
  .then(() => {
    console.log('Doctors data inserted successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB or inserting data:', err);
  })
  .finally(() => {
    // Close the connection
    mongoose.connection.close();
  });
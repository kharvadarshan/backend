const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


// mongoose.connect("mongodb://127.0.0.1:27017/onlineAppointmentBooking")
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Failed to connect to MongoDB', err));

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true, allowNull: false },
  specialty: { type: String, required: true, allowNull: false },
  specialization: { type: String, required: true, allowNull: false },
  experience: { type: String, required: true, allowNull: false },
  degree: { type: String, required: true, allowNull: false },
  fees: { type: Number, required: true, allowNull: false },
  address: { type: String, required: true, allowNull: false },
  about: { type: String, required: true, allowNull: false },
  field: { type: String, required: true, allowNull: false },
  contact: { type: String, required: true, allowNull: false },
  image: { type: String, required: false },
});

// Set auto-increment for the `id` field
doctorSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;




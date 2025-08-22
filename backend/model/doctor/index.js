const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// mongoose.connect("mongodb://127.0.0.1:27017/onlineAppointmentBooking")
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Failed to connect to MongoDB', err));

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true, allowNull: false },
  speciality: { type: String, required: true, allowNull: false },
  specialization: { type: String, required: true, allowNull: false },
  experience: { type: String, required: true, allowNull: false },
  degree: { type: String, required: true, allowNull: false },
  fees: { type: String, required: true, allowNull: false },
  address: { type: String, required: true, allowNull: false },
  about: { type: String, required: true, allowNull: false },
  field: { type: String, required: true, allowNull: false },
  email: { type: String, required: true, allowNull: false },
  phoneno: { type:String,required:true,allowNull:false},
  image: { type: String, required: false },
  password:{
    type: String, required: true, allowNull: false
  },
  role:{
    type: String,
    enum: ['doctor'],
    default: 'doctor'
  },
  rating:{
    type:Number,
    min:1,
    max:5,
    required:false
   },
   isBlocked : {type: Boolean , default: false}
},{
  timestamps:true,
});

// Set auto-increment for the `id` field
doctorSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;




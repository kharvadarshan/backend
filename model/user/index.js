const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// mongoose.connect('mongodb://localhost:27017/onlineAppointmentBooking')
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('Failed to connect to MongoDB', err));


const userSchema = new mongoose.Schema({
    userId:  { type: Number, unique:true},
    firstName: { type: String, required: true, allowNull: false },
    lastName: { type: String, required: true, allowNull: false },
    email: { type: String, required: true, unique: true, allowNull: false },
    password: { type: String, required: true, allowNull: false },
    role : { type: String, enum : ['user','doctor','admin'],required:true}
});

userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

const User = mongoose.model('User',userSchema);
module.exports = User;
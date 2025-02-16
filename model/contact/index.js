const mongoose = require('mongoose');

// mongoose.connect("mongodb://127.0.0.1:27017/onlineAppointmentBooking")
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Failed to connect to MongoDB', err));

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
},{
     timestamps: true 
})

const ContactModel = new mongoose.model('contactUs',contactSchema);

module.exports = ContactModel;
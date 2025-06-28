const mongoose = require('mongoose');

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
},{
     timestamps: true 
})

const ContactModel = new mongoose.model('contactUs',contactSchema);

module.exports = ContactModel;
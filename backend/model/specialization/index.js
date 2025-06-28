
const mongoose = require('mongoose');

const specializationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    isDeleted:{
        type:Boolean,
        required:false,
        default:false,
    },
    createdAt:
    {
        type:Date,
        default:Date.now,
    }
},{
    timestamps:true
});

const Specialization = mongoose.model('Specialization',specializationSchema);
module.exports=Specialization;
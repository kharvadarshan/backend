const mongoose=require('mongoose');

const timeRangeSchema = new mongoose.Schema({
    start:{
        type :Date,
        required:true
    },
    end:{
        type:Date,
        required:true
    },
    status:{
        type: String,
        enum : ['Available','Booked','Accepted','Rejected','Pending'],
        default:'Available'
    }
});


const timeSlotSchema = new mongoose.Schema({
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    date:{
        type: Date,
        required:true
    },
    slot: [timeRangeSchema],
});

const TimeSlot  = mongoose.model('TimeSlot',timeSlotSchema);
module.exports = TimeSlot;
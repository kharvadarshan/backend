const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    userId:  { type: Number, unique:true},
    userName: { type: String, required: true, allowNull: false },
    email: { type: String, required: true, unique: true, allowNull: false },
    password: { type: String, required: true, allowNull: false },
    role : { type: String, enum : ['user','doctor','admin'],required:true},
    image: { type: String, required: false,default:null},
    isBloked: { type:Boolean,required:false,default:false}
},{
    timestamps:true,
  });

userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

const User = mongoose.model('User',userSchema);
module.exports = User;
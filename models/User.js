const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    password:{
type:String,
required:true
    },
    role:{
        type:Number,
        default: 0,
    },
    address:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
    },
    image:{
        type:String
    }
},
{timestamps: true}
);
const User = mongoose.model('User', UserSchema);
module.exports = User;  
const mongoose = require('mongoose');


const RamSchema = new mongoose.Schema({
    ramid:{
        type: String,
        
    },
    ramName:{
        type: String,
        
    },
    id:{
        type:String,
    }
},
{timestamps: true}
);
const Ram = mongoose.model('Ram', RamSchema);
module.exports = Ram;
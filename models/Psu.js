const mongoose = require('mongoose');


const PsuSchema = new mongoose.Schema({
    psuid:{
        type: String,
        
    },
    psuName:{
        type: String,
        
    },
    id:{
        type:String,
    }
},
{timestamps: true}
);
const Psu = mongoose.model('Psu', PsuSchema);
module.exports = Psu;
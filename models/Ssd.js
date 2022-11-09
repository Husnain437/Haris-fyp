const mongoose = require('mongoose');


const SsdSchema = new mongoose.Schema({
    ssdName:{
        type: String,
        
    },
    ssdid:{
        type: String,
        
    },
    id:{
        type:String,
    }
},
{timestamps: true}
);
const Ssd = mongoose.model('Ssd', SsdSchema);
module.exports = Ssd;
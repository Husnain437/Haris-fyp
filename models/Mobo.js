const mongoose = require('mongoose');
const MoboSchema = new mongoose.Schema({
    moboid:{
        type: String,
        
    },
    moboName:{
        type: String,
        
    },
    id:{
        type:String,
    }
},
{timestamps: true}
);
const Mobo = mongoose.model('Mobo', MoboSchema);
module.exports = Mobo;
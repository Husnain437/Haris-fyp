const mongoose = require('mongoose');


const GpuSchema = new mongoose.Schema({
    gpuName:{
        type: String,
        
    },
    gpuid:{
        type: String,
        
    },
    id:{
        type:String,
    }
},
{timestamps: true}
);
const Gpu = mongoose.model('Gpu', GpuSchema);
module.exports = Gpu;
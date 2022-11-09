const mongoose = require('mongoose');


const CpuSchema = new mongoose.Schema({
    processor_name:{
        type: String,
        
    },
    processor_id:{
        type: String,
        
    },
    id:{
        type:String,
    }
},
{timestamps: true}
);
const Cpu = mongoose.model('cpus', CpuSchema);
module.exports = Cpu;
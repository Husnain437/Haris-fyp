const mongoose = require('mongoose');


const CaseSchema = new mongoose.Schema({
    caseid:{
        type: String,
        
    },
    caseName:{
        type: String,
        
    },
    id:{
        type:String,
    }
},
{timestamps: true}
);
const Case = mongoose.model('Cases', CaseSchema);
module.exports = Case;
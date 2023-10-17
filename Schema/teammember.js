const { default: mongoose, Mongoose } = require("mongoose");

//if advocate or judge will adding the client
const schema=new mongoose.Schema({
    
    username:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true
    },
    contactnumber:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        required:true,

    },

    
})
mongoose.models={}

const teammem=mongoose.model.teammem ||  mongoose.model('teammem',schema);
export default teammem;
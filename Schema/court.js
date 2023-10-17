const { default: mongoose } = require("mongoose");

//if advocate or judge will adding the client
const schema=new mongoose.Schema({
    Juridiction:{
        type:String,
        required:false
    },
    courtname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    }
  
})
mongoose.models={}

const court=mongoose.model.court ||  mongoose.model('court',schema);
export default court;
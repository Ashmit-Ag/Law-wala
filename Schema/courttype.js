const { default: mongoose } = require("mongoose");

//if advocate or judge will adding the client
const schema=new mongoose.Schema({
    courttype:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    },
    
  
})
mongoose.models={}

const courttype=mongoose.model.courttype ||  mongoose.model('courttype',schema);
export default courttype;
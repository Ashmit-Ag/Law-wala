const { default: mongoose } = require("mongoose");

//if advocate or judge will adding the client
const schema=new mongoose.Schema({
    casetype:{
        type:String,
        required:true
    },
    casesubtype:{
        type:String,
        required:true
    },
    casecategory:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    }
    
  
})
mongoose.models={}

const casetype=mongoose.model.casetype ||  mongoose.model('casetype',schema);
export default casetype;
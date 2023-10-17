const { default: mongoose } = require("mongoose");

//if advocate or judge will adding the client
const schema=new mongoose.Schema({
   
   clientid:{
    type:String,
    required:false
   },
   advocateid:{
    type:String,
    required:false
   },
   date:{
    type:String,
    required:true
   },
   time:{
    type:String,
    required:true
   },topic:{
      type:String,
      required:true
   },
   status:{
      required:true,
      type:Boolean
   },
   place:{
      type:String,
      required:false
   }
  
})
mongoose.models={}

const appointement=mongoose.model.appointement ||  mongoose.model('appointement',schema);
export default appointement;
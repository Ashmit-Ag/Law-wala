const { default: mongoose } = require("mongoose");

//if advocate or judge will adding the client
const schema=new mongoose.Schema({
    fullname:{
type:String,
required:true
    },
    phonenumber:{
        type:String,
        required : true
    },
    password:{
        type:String,
        required : true
    },

    email:{
        type:String,
        required:true
    },
    judgeid:{
        type:String,
        required:false
    }
,
tasksid:{
    type:Array,

    required:false
},
caseassigned:{
    type:Number,
    required:false
},
type:{
    type:String,required:true
}
})
mongoose.models={}

const judgetype=mongoose.model.appointement ||  mongoose.model('judge',schema);
export default judgetype;
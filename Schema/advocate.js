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
    advocateid:{
        type:String,
        required:false
    }
,clientsid:{
    type:Array,
    required:false
},
tasksid:{
    type:Array,

    required:false
},
appointementid:{
    type:Array,
    required:false
}
})
mongoose.models={}

const advocatetype=mongoose.model.appointement ||  mongoose.model('advocateaccount',schema);
export default advocatetype;
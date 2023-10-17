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
    clientid:{
        type:String,
        required:false
    }
,advocatesid:{
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

const clienttype=mongoose.model.appointement ||  mongoose.model('clienttype',schema);
export default clienttype;
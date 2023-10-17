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
    clientsid:{
        type:Array,
        required:false
    },
    judgesid:{
        type:Array,
        required:true
    },
    casetype:{
        type:Array,
        required:true
    }

})
mongoose.models={}

const admin=mongoose.model.appointement ||  mongoose.model('adminaccount',schema);
export default admin;
const { default: mongoose } = require("mongoose");

//if advocate or judge will adding the client
const schema=new mongoose.Schema({
    sender:{
        type:String,
        required:true
    },
    receiver:{
        type:String,
        required:true
    },
    message:{
        type:String,

        required:true
    }
},{timestamps:true})
mongoose.models={}

const chat=mongoose.model.appointement ||  mongoose.model('chat',schema);
export default chat;
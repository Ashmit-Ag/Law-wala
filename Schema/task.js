const { default: mongoose, Mongoose } = require("mongoose");

//if advocate or judge will adding the client
const schema=new mongoose.Schema({
    userid:{
type:String,
        required:true
    },
    task:{
        type:String,
        required:true

    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    }

    
})
mongoose.models={}

const task=mongoose.model.task ||  mongoose.model('task',schema);
export default task;
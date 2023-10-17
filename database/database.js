import mongoose from "mongoose"

export  async function databaseconnect(){
   await mongoose.connect('mongodb+srv://blogapp:test123@cluster0.jpv4imv.mongodb.net/',{
        useNewUrlParser:true,
    }).then(()=>{
        console.log("backend server running")
    })
}
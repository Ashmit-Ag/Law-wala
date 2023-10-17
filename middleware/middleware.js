const express=require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const router=express.Router();
const jwt=require('jsonwebtoken')

const secret='mynameisayushmaan'
module.exports =((req,res,next)=>{
    const id=jwt.verify(req.headers.authtoken,secret)
    req.user=id;
    next();
})
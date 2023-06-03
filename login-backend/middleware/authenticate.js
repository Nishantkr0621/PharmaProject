const jwt = require("jsonwebtoken");
const User = require("../model/userschema.js");
// const cookies = require('cookie-parser')
// const express = require('express');
// const app = express();
// app.use(cookies());

const Authenticate = async (req,res,next) => {
   try {
       // const token = req.cookies.jwt ;
     const token =  req.cookies.jwtoken ;
//     const token =  req.headers.cookie.split('=')[1] ;
//     const token = req.headers.authorization ;
//         console.log('token wala console',req.headers.authorization);
//         console.log('token wala console cook',req.headers.cookie.split("=")[1]);
        const varifyToken = jwt.verify(token , process.env.SECRET_KEY);
        const rootUser = await User.findOne({_id:varifyToken._id , "tokens.token":token});
        if(!rootUser) { throw new Error('user not found')}
        req.token = token ;
        req.rootUser = rootUser ;
        console.log(rootUser);
        req.userId = rootUser._id ;

        next() ;
   }
   catch (err) {
    res.status(401).send('Unautherised : No token provided');
         console.log(err);
        // res.send(req.rootUser);
   }
  // res.send(req.rootUser);
}

module.exports = Authenticate ;
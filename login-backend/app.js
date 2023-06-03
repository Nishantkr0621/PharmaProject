
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const express = require("express");
//const { use } = require("./router/auth");
const app = express();


dotenv.config({ path: "./config.env" });
require('./db/connect');

// use middlewear to understand json 
app.use(express.json());

//const User = require('./model/userschema')

// we link the router files to make our route easy 
app.use(require('./router/auth')) ;

// const DB = process.env.DATABASE ;
const PORT = process.env.PORT ;

// mongoose.connect(DB).then(()=>{
//     console.log("connection successful");
// }).catch((err)=>{
//     console.log(err);
// });

// const student = new mongoose.Schema({
//   name:String,
//    age:Number,
//    workout:Boolean
// })

// const Students = new mongoose.model("Students",student);

// const adder = async () =>{

//     const ss = await Students.create({
//         name:"dabba",
//         age:24,
//         workout:true 
//      })
     
     

// }
// adder()
// const ss = new Students({
//    name:"nishant",
//    age:25,
//    workout:true 
// })

//  await ss.save();

// mongoose.set('strictQuery',true);

// const connectDB = ()=>{
//     mongoose.connect(DB).then(()=>{
//         console.log(`connected DB`);
//     })
// }

// connectDB();

// const middleware = (req,res,next) => {
//     console.log("hello middleware");
//     next();
// }

app.get("/",(req,res)=>{
    res.send(`hello world from server from app js page`);

});

// app.get("/about",(req,res)=>{
//     res.send(`hello world from about page`);

// });

app.get("/contact",(req,res)=>{
    res.send(`hello world from contact page`);

});

app.get("/login",(req,res)=>{
    res.send(`hello world from login page`);

});

app.get("/register",(req,res)=>{
    res.send(`hello world from ragister page`);

});

app.listen(PORT,()=>{
    console.log(`server is running at port no ${PORT}`);
})
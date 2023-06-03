//const bcrypt = require('bcryptjs');

const express = require('express');
const router = express.Router();

const cookieParser = require("cookie-parser");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

require('../db/connect');

const User = require('../model/userschema');

router.get('/',(req,res)=>{
    res.send("hello Home page from router js");
});



router.post('/register', async(req,res)=>{
    const { name ,email,phone,password,cpassword } = req.body ;

    if(!name || !email || !phone || !password || !cpassword){
        return res.status(422).json({error : "please fill all input field"});

    }

    try {

   const userExist = await  User.findOne({email})
    //   // await bcrypt.compare(frontend wala password , backend wala password)
    //  const isMatch =  await bcrypt.compare(password,userExist.password) ;

            if(userExist){
                return res.status(422).json({error: "Email already Exist"});
            } else if(password !== cpassword){
                return res.status(422).json({error: "please enter valid data"});
            }
            else{
                const user = new User({name,email,phone,password,cpassword})
            
                 await user.save();
                 res.status(201).json({message :"user register successfully"});
            }
    
        //     const user = new User({name,email,phone,password,cpassword})
            
        //    const userRegister =  await user.save();

        //    if(userRegister){
        //     res.status(201).json({message :"user register successfully"});
        //    }
        //    else{
        //     res.status(500).json({error : "Failed to register"})
        //    }     

    } catch(err){
        console.log(err);
    }

});

// login router 

router.post('/login', async (req,res)=>{
    // console.log(req.body);
    // res.send({message:"wooo.."});
    let token ;
    try{
     const {email , password} = req.body ;
     if(!email || ! password){
        return res.status(400).json({error:"Please fill the data"});
     }

     const userLogin = await User.findOne({email});

     if(userLogin){
        // await bcrypt.compare(frontend wala password , backend wala password)
         const isMatch =  await bcrypt.compare(password,userLogin.password) ;

   

         if(!isMatch){
            res.status(400).json({error:"Please Fill Valid data"});
    
         }else{
          //  res.status(200).json({message:"Successfully LogedIn" ,statuscode:200});

             token = await userLogin.generateAuthToken();
               //  console.log(token);

            //    const finalToken =  ("jwtoken",token , {
    
            //     expires: new Date(Date.now() + 25892000000),
            //     httpOnly:true
            //  });

            // res.cookie("jwtoken",token , {
    
            //    expires: new Date(Date.now() + 25892000000),
            //    httpOnly:true
            // });

            res.cookie("jwtoken",token , {
    
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
             });

           

        
                res.status(200).json({message:"Successfully LogedIn" ,statuscode:200 , accessToken:token});
         }
       //  res.json({message:"Successfully LogedIn"});
     }else{
        res.status(400).json({error:"Please Fill Valid data"});
     }
   

   
    } catch (err) {
        console.log(err);
    }
})

// about us ka page

router.get("/about",authenticate,(req,res)=>{
    res.send(`hello world from about page`);


});

// contact us page

router.get("/contact",authenticate,(req,res)=>{
    res.send(req.rootUser);
    res.status(200).json({message:"filled",statuscode:200})


});

// logout page 

router.get('/logout',(req,res)=>{
    console.log("hello logout page from backend");
   // res.clearCookie("jwtoken");
    // localStorage.removeItem("jwtoken")
   // res.end();
    res.status(200).json({message:"filled",statuscode:200})
})

router.use(cookieParser())

module.exports = router ;
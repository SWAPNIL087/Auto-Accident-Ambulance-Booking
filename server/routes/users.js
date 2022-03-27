const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')

const User = require('../models/users')
// const authenticate = require('../middleware/authenticate')
router.post('/register_A',async(req,res)=>{
    console.log('recieved')
    console.log(req.body.body)
    const{mail,name,age,Dl,password} = req.body.body;
    try{
        const userExists = await User.findOne({mail:mail})
        if(userExists){
            console.log('repeated user')
            res.send('failure')
            return res.status(422).json({error:'User already exists!'})
        }
        const user = new User({mail,name,password,age,Dl});
        //hashing here
        await user.save();
        res.status(201).json({message:'User registered successfuly'})
    }
    catch (err){
        console.log(err);
        res.send('failed')
    }
})

router.post('/login',async(req,res)=>{
    console.log('recieved the login details',req.body.body)
    try{
        const {email,password} = req.body.body

        if (!email || !password){
            res.send('all inputs are required!')
        }

        const userLogin = await User.findOne({email:email});

        if (!userLogin){
            res.send('No user Found!')
        }
        else{
            const isMatch = await bcrypt.compare(password,userLogin.password)
            console.log(userLogin.password)
            console.log(bcrypt.hashSync(password,10))
            const token = await userLogin.generateAuthToken();

            res.cookie("jwtoken",token,{
                expires:new Date(Date.now() + 259200000), // 3 days
                httpOnly:true
            })

            if (isMatch===false){
                res.send('Invalid credentials')
            }
            else{
                res.send('Login Success')
            }
        }
    }
    catch(err){
        console.log(err)
        res.send('login Failed!')
    }
    
})

module.exports = router;
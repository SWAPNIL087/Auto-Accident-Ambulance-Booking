const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')

const User = require('../models/users')
const authenticate = require('../middleware/authenticate')

router.post('/login',async(req,res)=>{
    console.log('login credentials recieved')
    console.log(req.body.body);
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
            userLogin.comparePassword(req.body.body.password, (error, match) => {
                if(!match) {
                    return response.status(400).send({ message: "The password is invalid" });
                }
            });
            res.send({ message: "login successfull!" });
        
        }
    }
    catch(err){
        console.log(err)
        res.send('login Failed!')
    }
})

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
        //hashing here before save
        await user.save();
        res.status(201).json({message:'User registered successfuly'})
    }
    catch (err){
        console.log(err);
        res.send('failed')
    }
})



module.exports = router;
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
    console.log('recieved the login details')
    
})

module.exports = router;
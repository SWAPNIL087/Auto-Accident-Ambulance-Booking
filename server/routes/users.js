const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')

const User = require('../models/users')
const authenticate = require('../middleware/authenticate')

const comparePassword = async function(plaintext, callback) {
    console.log("function found!")
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};

router.post('/login',async(req,res)=>{
    console.log('login credentials recieved')
    console.log(req.body.body);
    try{
        const {email,password} = req.body.body

        if (!email || !password){
            res.send('all inputs are required!')
        }

        const userLogin = await User.findOne({mail:email});

        if (!userLogin){
            console.log('no user found')
            res.send('No user Found!')
        }
        else{
            const token = await userLogin.generateAuthToken();
            userLogin.comparePassword(req.body.body.password, (error, match) => {
                if(!match) {
                    console.log("invalid password")
                    return response.status(400).send({ message: "The password is invalid" });
                }
            });
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now() + 259200000), // 3 days
                httpOnly:true
            })
            console.log("login successfull")
            res.send({ message: "login successfull!", DriverName : userLogin.name , DriverLicense:userLogin.Dl });
        
        }
    }
    catch(err){
        console.log("login failed due to this err = >",err)
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

router.get('/logout',authenticate,async(req,res)=>{
    console.log('logout')
    res.clearCookie('jwtoken',{path:'/'})
    res.send('User Logout')
})

router.get('/Ambulance_login',authenticate,async(req,res)=>{
    console.log('recieved the after login info')
    res.send(req.rootUser);
})

router.post('/bookAmbulance',authenticate,async(req,res)=>{
    console.log(req.body.body.key,"bookAmbulance in server end")
    const {key,lat,lng} =  req.body.body
    console.log(key,lat,lng)
    //key is the email of the ambulance that is booked
    // lat and lng are the location coordinated of the user who booked the ambulance

    const filter = { mail: key };
    const update = { Status: "Requested" };

    let doc = await User.findOneAndUpdate(filter, update, {
        new: true
      });

    var newData = {
        lat:lat,
        lng:lng
    }
    User.updateOne(
        filter, 
        { $push: { BookingReq: newData } },
        function(err, result) {
            if (err) {
                console.log(err)
              res.send(err);
            } else {
                console.log(result)
              res.send(result);
            }
          }
        
    );
    console.log(doc.Status)

})

router.post('/Booking_Requests',authenticate,async(req,res)=>{
    const {key} = req.body.body;
    var data = await User.findOne({mail:key})
    console.log(data.BookingReq)
    res.send(data.BookingReq)
})

module.exports = router;
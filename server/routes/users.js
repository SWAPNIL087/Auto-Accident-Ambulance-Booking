const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')

const User = require('../models/users')
const User2 = require('../models/users2')

const authenticate = require('../middleware/authenticate');
const authenticateUser = require('../middleware/authenticateUser');
const AuthenticateUser = require("../middleware/authenticateUser");

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

router.post('/user_login',async(req,res)=>{
    console.log('login credentials recieved')
    console.log(req.body.body);
    try{
        const {email,password} = req.body.body

        if (!email || !password){
            res.send('all inputs are required!')
        }

        const userLogin = await User2.findOne({mail:email});

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
            // console.log(userLogin)
            res.send({ message: "login successfull!",UserName:userLogin.name });
        
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

router.post('/register_user',async(req,res)=>{
    console.log('recieved')
    console.log(req.body.body)
    const{mail,name,password} = req.body.body;
    try{
        const userExists = await User2.findOne({mail:mail})
        if(userExists){
            console.log('repeated user')
            res.send('failure')
            return res.status(422).json({error:'User already exists!'})
        }
        const user = new User2({mail,name,password});
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

router.get('/logoutUser',AuthenticateUser,async(req,res)=>{
    console.log('logout User......')
    res.clearCookie('jwtoken',{path:'/'})
    res.send('User Logout')
})

router.get('/Ambulance_login',authenticate,async(req,res)=>{
    console.log('recieved the after login info');
    res.send(req.rootUser);
})

router.get('/userLogin',authenticateUser,async(req,res)=>{
    console.log('recieved the login info for user');
    res.send(req.rootUser);
})

router.post('/bookAmbulance',authenticateUser,async(req,res)=>{
    const {mail,lat,lng,currUser} =  req.body.body
    console.log(mail,lat,lng,currUser)
    // implement code to send the booking req to specific ambulance driver
    // update that specific driver's booking req array
    // and change the book button to requested.
    try{

    var newData = {
        UserName:currUser,
        lat:lat,
        lng:lng
    }

    User.findOneAndUpdate(
        { mail: mail }, 
        { 
            $push: { "BookingReq": newData },
            $set:{"Status":"Requested"},
        }
        ,
        {safe:true,upset:true},
        function(err,model){
            console.log(err)
        }
    );

    newUserData = {
        DriverMail:mail,
        Status:'requested',

    }

    User2.findOneAndUpdate(
        { mail: newData.UserName }, 
        { 
            $push: { "BookingsMade": newUserData },
            $set:{"Status":"Requested"},
        }
        ,
        {safe:true,upset:true},
        function(err,model){
            console.log(err)
        }
    );
    res.status(201).json({message:'Requested'})
    }
    catch(err){
        console.log(err,"failed to add booking request!")
    }
    //then implement the logic in bookingrequest for ambulance driver.

})

router.post('/Booking_Requests',authenticate,async(req,res)=>{
    const {key} = req.body.body;
    var data = await User.findOne({mail:key})
    console.log(data.BookingReq)
    res.send(data.BookingReq)
})

router.post('/reject_request',authenticate,async(req,res)=>{
    console.log(req.body.body.UserName,"recieved details of rejections!");
    const {UserName,driverName} = req.body.body
    try{
    User2.updateOne({ mail: UserName }, { "$pull": { "BookingsMade": { "DriverMail": driverName } }}, { safe: true, multi:true }, function(err, obj) {
        console.log(err);
    })
        
    User.updateOne({ mail: driverName }, { "$pull": { "BookingReq": { "UserName": UserName } }}, { safe: true, multi:true }, function(err, obj) {
        console.log(err);
    })

        res.status(201).json({message:'Rejected request'})
        }
        catch(err){
            console.log(err,"failed to reject the booking!")
        }
})

router.post('/accept_request',authenticate,async(req,res)=>{
    // console.log(req.body.body.UserName,"recieved details of rejections!");
    const {UserName,driverName} = req.body.body
    console.log("acceptance request recieved",UserName,driverName);
    
    try{

        User.findOneAndUpdate(
            {mail:driverName,'BookingReq.UserName':UserName},
            {
                $set:{
                    'BookingReq.$.Status':'accepted'
                }
            },
            function(err,model){
                if(err){
                    console.log(err);
                    res.send('failed')
                }
            }
    )

        newUserData = {
            DriverMail:driverName,
            Status:'accepted',
        }
    
        //updating the status as accepted in User End
        User2.findOneAndUpdate(
            {mail:UserName,'BookingsMade.DriverMail':driverName},
            {
                $set:{
                    'BookingsMade.$.Status':'accepted'
                }
            },
            function(err,model){
                if(err){
                    console.log(err);
                    res.send('failed')
                }
            }
    )

        res.status(201).json({message:'Accepted'})

    
    }
    catch(err){
        console.log(err,"failed to reject the booking!")
    }
})

router.post('/complete_trip',AuthenticateUser,async(req,res)=>{
    const {UserName,driverName} = req.body.body
    console.log("completance request recieved",UserName,driverName);
    
    User.updateOne({ mail: driverName }, { "$pull": { "BookingReq": { "UserName": UserName } }}, { safe: true, multi:true }, function(err, obj) {
        console.log(err);
    })

    User2.updateOne({ mail: UserName }, { "$pull": { "BookingsMade": { "DriverMail": driverName } }}, { safe: true, multi:true }, function(err, obj) {
        console.log(err);
    })

        res.status(201).json({message:'completed'})

})

module.exports = router;
const jwt = require('jsonwebtoken');
const User2 = require('../models/users2')


const AuthenticateUser = async(req,res,next)=>{

    console.log("verifyin the user authentication")
    try{
        // console.log('authentification under process!')
        const token = req.cookies.jwtoken;
        // console.log(token);
        if(token==undefined){
            console.log('token not generated/expired.')
            throw new Error('User not found')
        }

        const verifyToken = jwt.verify(token,process.env.SECRET_KEY);



        const rootUser = await User2.findOne({_id:verifyToken._id,"tokens.token":token})
        console.log(rootUser,"printing the rootUser")
        if (!rootUser){
            console.log("cannot find the user")
            throw new Error('User not found')
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    }
    catch(err){
        res.send('unauthorised')
        console.log(err);
    }
}

module.exports = AuthenticateUser
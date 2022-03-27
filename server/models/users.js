const mongoose =require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    "mail":{
        type:String
    },
    'name':{
        type:String
    },
    "password":{
        type:String
    },
    'age':{
        type:String
    },
    "Dl":{
        type:String
    },
    tokens:[{
        token:{
            type:String
        }
    }]
})

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
         this.password = bcrypt.hashSync(this.password,10);
    }
    next();
})

userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(err){
        console.log(err);

    }
}

const users = mongoose.model('USER',userSchema)

module.exports = users;
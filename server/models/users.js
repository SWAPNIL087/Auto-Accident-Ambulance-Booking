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
    "Status":{
        type:String //Empty,requested,approved,
    },
    "BookingReq":[{
        "lat":{type:String},
        "lng":{type:String}
    }],
    tokens:[{
        token:{
            type:String
        }
    }]
})

userSchema.pre('save',async function(next){
    if(!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})

userSchema.methods.comparePassword = async function(plaintext, callback) {
    console.log("function found!")
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};


userSchema.methods.generateAuthToken = async function(){
    console.log('generating token!')
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        console.log(token,'token generated from model section')
        return token;
    }
    catch(err){
        console.log(err);

    }
}

const users = mongoose.model('USER',userSchema)

module.exports = users;
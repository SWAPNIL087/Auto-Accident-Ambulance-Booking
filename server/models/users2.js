//Users2 is for customer
const mongoose =require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    'mail':{
        type:String
    },
    'name':{
        type:String
    },
    "password":{
        type:String
    },
    "Status":{
        type:String // available/busy
    },
    "BookingsMade":[{
        "DriverMail":{type:String},
        "Status":{type:String}, //requested, Rejected, Confirmed
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
    // console.log("function found!")
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};


userSchema.methods.generateAuthToken = async function(){
    // console.log('generating token!')
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        console.log(token,'token generated for userlogin from model section')
        return token;
    }
    catch(err){
        console.log(err);

    }
}

const users2 = mongoose.model('USER2',userSchema)

module.exports = users2;
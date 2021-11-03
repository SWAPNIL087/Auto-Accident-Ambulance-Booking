const mongoose = require('mongoose');
const DB = process.env.DATABASE
console.log('--------------------')
console.log(process.env.DATABASE)
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('connection successful with mongo')
}).catch((err)=>{
    console.log(err)
    console.log('connection failed')
})
let  mongo = require('mongoose');
let Staffdetails=new mongo.Schema({
    StaffID:{type:Number},
    Staffname:{type:String},
    Department:{type:String},
    Password:{type:String}
})

let staffmodel= mongo.model('staff', Staffdetails)
module.exports=staffmodel;
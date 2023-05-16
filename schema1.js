let mongo = require('mongoose');
let studentdetails= new mongo.Schema({
    StudentID :{type:Number},
    Studentname:{type:String},
    Percentage:{type:Number},
    Department:{type:String},
    password:{type:String}
})

let studmodel= mongo.model('student', studentdetails)
module.exports=studmodel;
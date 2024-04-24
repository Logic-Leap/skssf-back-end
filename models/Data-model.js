const mongoose = require("mongoose"); // must be installed in project 

const DataModel  = new mongoose.Schema({
 image_url:{
    type:String,
    require: true
 },
 username :{
    type:String,
    require: true
 }
});


module.exports = mongoose.model( "User",DataModel)

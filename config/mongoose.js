const mongoose=require('mongoose');

//db uri passing
mongoose.connect('mongodb://localhost/codeial_db_development');

//checking connection
const db=mongoose.connection;

//handing error
db.on("error",console.error.bind(console,"MongoDB connection error"));

//connecting to database
db.once('open',function(){
    console.log("connected to mongoDB database")
})

exports.modules=db;
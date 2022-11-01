const mongoose=require('mongoose');
const env=require('./environment');

//db uri passing
mongoose.connect(`mongodb://localhost/${env.db}`);

//checking connection
const db=mongoose.connection;

//handing error
db.on("error",console.error.bind(console,"MongoDB connection error"));

//connecting to database
db.once('open',function(){
    console.log("connected to mongoDB database")
})

exports.modules=db;
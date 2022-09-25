const cookieParser = require('cookie-parser');
const express=require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const app=express();
const port=8000;
const db=require('./config/mongoose');

//ejs layout wrapper setup
app.use(expressEjsLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//parser setup
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//setup for static files
app.use(express.static('./assets'));


//view setup
app.set('view engine','ejs');
app.set('views','./Views');

//using express router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err)
    {
        console.log(`error in running server ${err}`);
        return;
    }
    console.log(`Server is running on port: ${port}`);
})
const cookieParser = require('cookie-parser');
const express=require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const app=express();
const port=8000;
const db=require('./config/mongoose');
//passport and express-session setup
const expressSession=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport_local_strategy');
const MongoStore=require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');

//sassMiddleware setup
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'
}));


//ejs layout wrapper setup
app.use(expressEjsLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//parser setup
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//setup for static files
app.use(express.static('./assets'));
//make the uploads path available for brwser
app.use('/uploads',express.static(__dirname+'/uploads'));


//view setup
app.set('view engine','ejs');
app.set('views','./Views');

//express-session config middleware and mongoStore to store cookies
app.use(expressSession({
    name:'codeial',
    secret:'howudoing',
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:(1000*60*100)},
    store:MongoStore.create({
        mongoUrl:'mongodb://localhost/codeial_db_development',
        autoRemove:'disabled'
    },
    function(err){
        console.log(err || 'connect-mongoStore is OK');
    }

    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

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
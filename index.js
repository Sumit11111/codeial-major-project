const cookieParser = require('cookie-parser');
const express=require('express');
const logger=require('morgan');
const expressEjsLayouts = require('express-ejs-layouts');
const app=express();
//helper function called here to pass ur server so we can fetch paths from gulp
require('./config/view_helper')(app);
const port=8000;
const db=require('./config/mongoose');
//passport and express-session setup
const expressSession=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport_local_strategy');
const passportJWTStrategy=require('./config/passport_jwt_strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const MongoStore=require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');
const env=require('./config/environment');
const path = require('path');

//setup for chat server
const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_socket').chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat server is listening at port 5000");

//sassMiddleware setup
if(env.name=="development"){
app.use(sassMiddleware({
    src:path.join(__dirname,`${env.asset_path}/scss`),
    dest:path.join(__dirname,`${env.asset_path}/css`),
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'
}));
}


//ejs layout wrapper setup
app.use(expressEjsLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//parser setup
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//setup for static files
app.use(express.static('./public/assets'));
//make the uploads path available for browser
app.use('/uploads',express.static(__dirname+'/uploads'));

//logger setup
app.use(logger(env.morgan.mode, env.morgan.options));

//view setup
app.set('view engine','ejs');
app.set('views','./Views');

//express-session config middleware and mongoStore to store cookies
app.use(expressSession({
    name:'codeial',
    secret:env.session_cookie_key,
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
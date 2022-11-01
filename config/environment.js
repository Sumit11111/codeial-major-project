const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream=rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
})

const development={
name:'development',
asset_path:process.env.CODEIAL_ASSET_PATH,
session_cookie_key:'h18AzqDZf4OquIuG7eE8r0re0ULotjU1',
db:'codieal_development',
smtp:{
    service:"gmail",   
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:"sumitdhanda1111@gmail.com",
        pass:"opxjlepbvcwiwvcp"
    }
},
google_client_id:"458150551720-dkbfcsakmuh8268kh2m4teft31bdadct.apps.googleusercontent.com",
google_client_secret:"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",
google_call_back_url:"http://localhost:8000/users/auth/google/callback",
jwt_secret:"EMofbBSD2yehsaa5YXlcua4nC8qLx2sI",
morgan:{
    mode:'dev',
    options:{accessLogStream}
}
}

const production={
    name:process.env.CODEIAL_DB,
    asset_path:process.env.CODEIAL_ASSET_PATH,
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
        service:"gmail",   
        host:process.env.CODEIAL_SMTP_HOST,
        port:587,
        secure:false,
        auth:{
            user:process.env.CODEIAL_SMTP_AUTH_USER,
            pass:process.env.CODEIAL_SMTP_AUTH_PASS
        }
    },
    google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url:process.env.CODEIAL_GOOGLE_CALL_BACK_URL,
    jwt_secret:process.env.CODEIAL_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{accessLogStream}
    }
}

module.exports=eval(process.env.CODEIAL_ENVIRONMENT)==undefined ? development:eval(process.env.CODEIAL_ENVIRONMENT);
//module.exports=development;
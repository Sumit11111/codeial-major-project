const nodemailer=require('nodemailer');
const path=require('path');
const ejs=require('ejs');
const env=require('./environment');

let transporter=nodemailer.createTransport(env.smtp);

let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(path.join(__dirname,"../views/mailer",relativePath),data,function(err,template){
        if(err)
        {
            console.log('error in rendering templete',err);
            return;
        }
        mailHTML=template;
    });
    return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}
const nodeMailer=require('../config/nodemailer');

exports.newComment=(comment)=>{

    let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from:"sumitdhanda1111@gmail.com",
        to:comment.user.email,
        subject:"codeial Comment",
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log("Error in sending mail",err);
            return;
        }
        //console.log("mail sent!",info);
        return;
    })
}
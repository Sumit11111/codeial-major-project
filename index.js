const express=require('express');
const app=express();
const port=8000;

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
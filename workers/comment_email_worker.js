const queue=require('../config/kue');
const comment = require('../models/comment');

let job=queue.create('create',comment).save((err)=>{
    if(err){
        console.log("Error in sending to the queue",err);
        return;
    }
    console.log('job enqueued',job.id);
})
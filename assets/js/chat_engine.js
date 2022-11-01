class ChatEngine{
    constructor(chatboxId,userEmail){
        this.chatboxId=$(`#${chatboxId}`);
        this.userEmail=userEmail;

        this.socket=io.connect('http://localhost:5000');
        if(this.userEmail)
        {
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self=this;
        this.socket.on('connect',function(){
            console.log("connection established using socket....");

            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'codeial'
            });

            self.socket.on('user_joined',function(data){
                console.log('A user joined!',data);
            })
        })

        //Initialising chat message
        $('#send-message').click(function(){
            let msg=$('#chat-message-input').val();

            if(msg!=''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'codeial'
                })
            }
        })
    }
}
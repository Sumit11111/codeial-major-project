module.exports.chatSockets=function(socketServer){
    const io = require('socket.io')(socketServer, {
        cors: {
            origin: "http://localhost:5000",
            methods: ["GET", "POST"]    
        }
    });

    io.sockets.on('connection',function(socket){
        console.log('new connection received',socket.id);

        socket.on('disconnect',function(){
            console.log('socket disconnected!');
        });

        socket.on('join_room',function(data){
            console.log('joining request rec.',data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined',data);
        });

        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('receive_message',data.message);

            let newMessage=$('<li>');
            let messageType='other-message';

            if(data.user_email==self.userEmail){
                messageType='self-message';
            }

            newMessage.addClass(messageType);
            newMessage.append($('<span>',{
                'html':data.message
            }));
            newMessage.append($('<sub>',{
                'html':data.user_email
            }));

            $('chat-message-list').append(newMessage);
        })
    })
}
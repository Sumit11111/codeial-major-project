{
    console.log("inside comments");
    let createComment=function(){
        console.log("create comment called");
        let newCommentForm=$('#post-comments-form');
        newCommentForm.submit((e)=>{
            e.preventDefault();
            console.log("prevented default");

            $.ajax({
                type:'post',
                url:'/comments/create',
                data:newCommentForm.serialize(),
                beforeSend:function(){
                    new Noty({
                        theme : 'relax' , 
                        text: "Someone Commented",
                        type: 'success',
                        layout : "topRight",
                        timeout : 1500
                        }).show();
                },
                success:function(data){
                    console.log(data);
                    let newComment=newCommentDom(data.data.comment);
                    $('#post-comments-list>ul').prepend(newComment);
                    deleteComment($(' .delete-comment-button',newComment));

                    new ToggleLike($('.toggle-like-button',newComment));
                    new Noty({
                        theme : 'relax' , 
                        text: "Post deleted",
                        type: 'success',
                        layout : "topRight",
                        timeout : 1500
                        }).show();
                },
                error:function(err){
                    console.log(err);
                }
            })
        })
    }


    //Method to create new comment dom
    let newCommentDom=function(comment){
        return $(`<li id="posts-comment-${comment._id}">
        <p>
            <small><a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a></small>
            ${comment.content}
            <br>
            <small>
                ${comment.user.name}
            </small>
            <br>
            <small>
                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">0 Likes</a>
            </small>
        </p>
    </li>`)
    }

    //delete comment on post
    let deleteComment=function(deleteLink){
        $(deleteLink).click((e)=>{
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                beforeSend:function(){
                    new Noty({
                        theme : 'relax' , 
                        text: "comment deleted successfully",
                        type: 'success',
                        layout : "topRight",
                        timeout : 1500
                        }).show();
                },
                success:function(data){
                    $(`#posts-comment-${data.comments._id}`);
                },
                error:function(err){
                    console.log(err);
                }
            })
        })
    }


    createComment();
}
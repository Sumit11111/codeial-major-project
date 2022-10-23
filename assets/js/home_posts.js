{
    let createPost=function(){
        let newPostForm=$('#new-post-form');
        
        newPostForm.submit((e)=>{
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/userPost/create',
                data:newPostForm.serialize(),
                beforeSend:function(){
                    new Noty({
                        theme : 'relax' , 
                        text: "Post Created",
                        type: 'success',
                        layout : "topRight",
                        timeout : 1500
                        }).show();
                },
                success:function(data){
                    console.log(data);
                    let newPost=newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                },
                error:function(err){
                    console.log(err.responseText);
                }
            })
        })
    }
    //Method to create post dom
    let newPostDom=function(post){
        return $(` <li id="post-${post.id}"> 
        <p>
            <small><a class="delete-post-button" href="/userPost/destroy/${post.id}">X</a></small>
            ${post.content}
            <br>
            <small>
                ${post.user}
            </small>
        </p>
        <div class="post-comments">
            <form action="/comments/create" method="post">
                <input type="text" name="content" placeholder="Enter your comment here...." required>
                <input type="hidden" name="post" value=" ${post.id}">
                <input type="submit" value="Add Comment">
            </form>
            <div class="post-comments-list">
                <ul id="post-comments-${post.id}">
                </ul>
            </div>
        </div>
    
    </li>`)
    }


    //method to delete a post
    let deletePost=function(deleteLink){
        $(deleteLink).click((e)=>{
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                beforeSend:function(){
                    new Noty({
                        theme : 'relax' , 
                        text: "Post deleted",
                        type: 'success',
                        layout : "topRight",
                        timeout : 1500
                        }).show();
                },
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error:function(err){
                    console.log(err.responseText);
                }
            })
        })
    }



    createPost();
}
<script type="text/javascript" src="/js/home_comments.js"></script>
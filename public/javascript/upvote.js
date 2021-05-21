//this public js script brings functionality to the upvote button in the served HTML

// the click hanlder is *async* because it will be used to make a fetch request
async function upvoteClickHandler(event) {
    event.preventDefault();
    
    // cuts out n?comment-body= from the url for later use
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    //possible errors at this point: we are not replying with the correct fields in the corresponding backend route, in this case Post.upvote()
    const response = await fetch('/api/posts/upvote', {
        method: 'PUT',
        body: JSON.stringify({
          post_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
       document.location.reload();
       console.log(id);
    
      } else {
        alert(response.statusText);
    }
}
  
  document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);
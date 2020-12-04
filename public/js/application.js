


let allForms = document.querySelectorAll('.inline');
for (let i = 0; i < allForms.length; i += 1) {
  allForms[i].addEventListener('submit', async (event) => {
    event.preventDefault();
    const postThis = event.target.closest('article');
    let button = postThis.querySelector('button');
    button.setAttribute('color', 'red');
    const postId = postThis.id;
    const action = `/posts/${postId}/vote`;
    const method = 'POST';
    responce = await fetch(action, { // в responce прилетает ответ от сервера
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({       //json
        postId: postId,
      }),
   
    });
    const data = await responce.json();
    let vot = postThis.querySelector('p');
    vot.innerHTML = `
      <span class='points'>${data.points}</span >
      <span class='username'>${data.username}</span>
      <span class='timestamp'>${data.timeSinceCreation}</span>
      <span class='comment-count'>${data.commentCount}</span>
      <a class="delete" href='/posts/${data._id}'></a>
      `
    
      
  });
}

// document.addEventListener('DOMContentLoaded', event => {
  let allButtons = document.getElementsByName('submit_param');
  for (let i = 0; i < allButtons.length; i += 1) {
    allButtons[i].addEventListener('click', async (event) => {
      event.preventDefault();
      console.log(event.target)
      const postThis = event.target.closest('article');
      let button = postThis.querySelector('button');
      button.setAttribute('style', 'color: red');
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
      let vot = postThis.querySelector('.points');
      console.log(vot);
      vot.innerText = data.points;
    });
  }
  const deleteAll = document.querySelectorAll('.delete');
  for (let i = 0; i < deleteAll.length; i += 1) {
    deleteAll[i].addEventListener('click', async (event) => {
      event.preventDefault();
      let postThis = event.target.closest('article');
      const postId = postThis.id;
      const action = `/${postId}`;
      const method = 'DELETE';
      responce = await fetch(action, { // в responce прилетает ответ от сервера
        method: method,
      });
      // const data = await responce.json();
      postThis.remove();
    });
  }
  let postNew = document.querySelector('#posts');
  postNew.addEventListener('submit', async (event) => {
    event.preventDefault();
    let newTitle = event.target.title.value;
    const action = `/posts/new`;
    const method = 'POST';
    responce = await fetch(action, { // в responce прилетает ответ от сервера
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({       //json
        title: newTitle, username: 'User', commentCount: Math.floor(Math.random() * 1000),
      }),
    });
    const data = await responce.json();
    console.log(data);
    let postCont = document.querySelector('.post-container');
    postCont.insertAdjacentHTML('afterBegin', `
    <article id="${data.id}">
    <form method="post" action='/posts/${data.id}/vote' class="inline">
        <button type="submit" name="submit_param" value="submit_value" class="fa fa-sort-desc vote-button upvote-button"></button>
    </form>
    <h2><a href='/posts/${data.id}'>${data.title}</a></h2>
    <p>
        <span class='points'>${data.points}</span>
        <span class='username'>${data.username}</span>
        <span class='timestamp'>${data.timeSinceCreation}</span>
        <span class='comment-count'>${data.commentCount}</span>
        <a class="delete" href='/posts/${data.id}'></a>
    </p>
  </article>
  `);
    postNew.reset();
    // let newArticle = document.getElementById(data.id);
    // console.log(newArticle);
    // let newButton = newArticle.querySelector('button');
    // allButtons.push(newButton);
    // console.log(newButton)
    // allButtons = document.getElementsByName('submit_param')
    console.log(allButtons);
    debugger
  });
// })

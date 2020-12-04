let allForms = document.querySelectorAll('.inline');
for (let i = 0; i < allForms.length; i += 1) {
  allForms[i].addEventListener('submit', async (event) => {
    event.preventDefault();
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
for (let i = 0; i < deleteAll.length; i+=1) {
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

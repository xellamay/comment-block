import { v4 as uuid } from "uuid";

document.addEventListener("DOMContentLoaded", init);

const comments = [
  // {
  //   id: uuid(),
  //   userName: "userName",
  //   text: "text",
  //   created: "15 мая 19:00",
  //   likeCount: 0,
  // }
]

function init() {
  renderCommentList(comments);
  addComment();
}

function renderCommentList(comments) {
  const listComment = document.querySelector(".list");
  comments.forEach((comment) => {
    const newNode = createComment(comment);
    listComment.prepend(newNode);
  })
}

function createComment(comment) {
  const node = document.createElement("li");
  node.classList.add("list__item");
  node.innerHTML = `
   <div class="comment">
    <div class="comment__name">${comment.userName}</div>
    <div class="comment__text">${comment.text}</div>
    <div class="comment__footer">
      <div class="comment__edit">
        <time class="comment__data" datetime="${comment.created}">${comment.created}</time>
        <button class="button button_edit">Удалить</button>
        <button class="button button_edit">Редактировать</button>
      </div>
      <div class="comment__like">
        <button class="button button_like">
          <img class="svg svg_like" src="/heart-svgrepo-com.10e370d5.svg" alt="like">
        </button>
        <div class="count">${comment.likeCount}</div>
      </div>
    </div>
   </div>
  `;

  return node;
}

function addComment() {
  const form = document.querySelector("#form");
  const textArea = form.comment;

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    event.stopPropagation();
    if(textArea.value) {
      comments.push({
        id: uuid(),
        userName: "userName",
        text: textArea.value,
        created: "15 мая 19:00",
        likeCount: 0,
      })
      
    renderCommentList(comments);
    form.reset();
    }
  });

}
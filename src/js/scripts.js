import { v4 as uuid } from "uuid";
import { getDateTimeNow, formatDateTimeToHuman } from "./dateTime";

document.addEventListener("DOMContentLoaded", init);

const comments =  getLocalStorageComment();

function init() {
  renderCommentList(comments);
  addComment();
}

function renderCommentList(comments) {
  const listComment = document.querySelector(".list");
  listComment.innerHTML = ``;
  comments.forEach((comment) => {
    const newNode = createComment(comment);
    listComment.prepend(newNode);
  })
}

function createComment(comment) {
  const node = document.createElement("li");
  node.classList.add("list__item");
  node.innerHTML = `
   <div class="comment" data-key="${comment.id}">
    <div class="comment__name">${comment.userName}</div>
    ${comment.isEditing === false
      ? `<div class="comment__text">${comment.text}</div>`
      : `<input class="comment__text comment__text_edit" type="text" value=${comment.text}>`
      }
    
    <div class="comment__footer">
      <div class="comment__edit">
        <time class="comment__data" datetime="${comment.created}">${formatDateTimeToHuman(comment.created)}</time>
        <button class="button button_ection button_delete">Удалить</button>
        ${comment.isEditing === false
          ? `<button class="button button_ection button_edit ">Редактировать</button>`
          : `<button class="button button_ection button_edit button_save ">Сохранить</button>`
          }
        
      </div>
      <div class="comment__like">
        <button class="button button_like">
          ${comment.likeCount === 0
            ? `<img class="svg svg_like" src="/heart-svgrepo-com.10e370d5.svg" alt="like"></img>`
            : `<img class="svg svg_like" src="/heart_icon_red_hollow.svg" alt="like"></img>`
            }
        </button>
        <div class="count">${comment.likeCount}</div>
      </div>
    </div>
   </div>
  `;

  const deleteBtn = node.querySelector(".button_delete");
  deleteBtn.onclick = () => deleteComment(comment);

  const likeBtn = node.querySelector(".button_like");
  likeBtn.onclick = () => {
    if (comment.likeCount === 0) {
      addLikeComment(comment);
    } else  {
      removeLikeComment(comment);
    }
  }

  if (comment.isEditing === false) {
    const editBtn = node.querySelector(".button_edit");
    editBtn.onclick = () => editingComment(comment);
  } else {
    const saveBtn = node.querySelector(".button_save");
    saveBtn.onclick = () => saveEditingComment(comment);
  }

  return node;
}

function addComment() {
  const form = document.querySelector("#form");
  const textArea = form.comment;

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    event.stopPropagation();
    if (textArea.value) {
      comments.push({
        id: uuid(),
        userName: "userName",
        text: textArea.value,
        created: getDateTimeNow(),
        likeCount: 0,
        isEditing: false,
      })
      
      updateComments()
      form.reset();
    }
  })
}

function deleteComment(comment) {
  const index = comments.indexOf(comment);
  if (index !== -1) {
    comments.splice(index, 1)
  };

  updateComments()
}

function addLikeComment(comment) {
 const index = comments.findIndex((el) => el.id === comment.id);
 comments[index].likeCount += 1;

 updateComments()
}

function removeLikeComment(comment) {
  const index = comments.findIndex((el) => el.id === comment.id);
  comments[index].likeCount -= 1;

  updateComments()
}

function localStorageComment() {
  localStorage.setItem("comments", JSON.stringify(comments))
}

function getLocalStorageComment() {
  const items = localStorage.getItem("comments");

  return JSON.parse(items) || [];
}

function updateComments() {
  renderCommentList(comments);
  localStorageComment();
}

function editingComment(comment) {
  const index = comments.findIndex((el) => el.id === comment.id);
  comments[index].isEditing = true;

  updateComments();
}

function saveEditingComment(comment) {
  const index = comments.findIndex((el) => el.id === comment.id);
  const commentNode = document.querySelector(`.comment[data-key='${comment.id}']`);
  const input = commentNode.querySelector(".comment__text_edit");

  comments[index].text = input.value;

  comments[index].isEditing = false;

  updateComments();
}
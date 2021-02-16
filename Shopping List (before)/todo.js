const form = document.querySelector("form");
const input = form.querySelector("input");
const btn = document.querySelector(".submitBtn");
const todo = document.querySelector(".js-todo");

function deleteToDO(event) {
    const btn = event.target;
    const li = btn.parentNode.parentNode;
    const ul = btn.parentNode.parentNode.parentNode;
    ul.removeChild(li);
}

function addToDo(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const delIcon = document.createElement("i");
    delIcon.setAttribute("class", "far fa-trash-alt");
    delIcon.setAttribute("id", "delBtn");
    delBtn.append(delIcon);
    delBtn.addEventListener("click", deleteToDO);
    span.innerText = text;
    li.append(span, delBtn);
    todo.append(li);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    addToDo(currentValue);
    input.value = "";
  }

form.addEventListener("submit", handleSubmit);
btn.addEventListener("click", handleSubmit);
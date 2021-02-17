const form = document.querySelector("form");
const input = form.querySelector("input");
const btn = document.querySelector(".submitBtn");
const items = document.querySelector(".js-todo");

// 사용자가 제출한 shopping item을 화면에 추가해주는 함수
function onAdd(event) {
    event.preventDefault();
    const text = input.value;
    if (text === "") {
        input.focus();
        return;
    }
    const item = createItem(text);
    items.appendChild(item);
    item.scrollIntoView({ block: "center" });
    input.value = "";
    input.focus();
}

// shopping item을 만드는 함수
let id = 0;
function createItem(text) {
    const itemRow = document.createElement("li");
    itemRow.setAttribute("class", "item__row");
    itemRow.setAttribute("data-id", id);

    itemRow.innerHTML = `
            <div class="item">
              <span class="item__name">${text}</span>
              <button class="delBtn" >
                  <i class="fas fa-trash-alt" data-id=${id}></i>
              </button>
            </div>
            <div class="liDivider"></div>`;
    id++;
    return itemRow;
}

form.addEventListener("submit", onAdd);
btn.addEventListener("click", onAdd);
items.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (id) {
        const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
        toBeDeleted.remove();
    }
});
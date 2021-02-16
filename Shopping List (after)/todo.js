const form = document.querySelector("form");
const input = form.querySelector("input");
const btn = document.querySelector(".submitBtn");
const items = document.querySelector(".js-todo");

// 사용자가 제출한 to do를 화면에 추가해주는 함수
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

// to do item을 만드는 함수
function createItem(text) {
    const itemRow = document.createElement("li");
    const item = document.createElement("div");
    item.setAttribute("class", "item");

    const span = document.createElement("span");
    span.innerText = text;
    
    const delBtn = document.createElement("button");
    delBtn.setAttribute("class", "delBtn");
    delBtn.innerHTML = ' <i class="fas fa-trash-alt"></i>';
    delBtn.addEventListener("click", () => {
        items.removeChild(itemRow);
    });
    
    const divider = document.createElement("div");
    divider.setAttribute("class", "liDivider");

    item.append(span, delBtn);
    itemRow.append(item, divider)
    return itemRow;
}

form.addEventListener("submit", onAdd);
btn.addEventListener("click", onAdd);
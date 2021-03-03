const items = document.querySelector(".items");
const logo = document.querySelector(".logo");
const tshirt = document.querySelector(".tshirt");
const pants = document.querySelector(".pants");
const skirt = document.querySelector(".skirts");
const blue = document.querySelector(".blue");
const yellow = document.querySelector(".yellow");
const pink = document.querySelector(".pink");

async function getData() {
    let response = await fetch("./data/data.json");
    let json = await response.json();
    
    json.items.forEach((item) => {
        const li = document.createElement("li");
        const img = document.createElement("img");
        const span = document.createElement("span");

        li.classList.add("item", item.type, item.color);
        img.setAttribute("src", item.image);
        span.innerText = item.gender + ", " + item.size + " size";
        li.appendChild(img);
        li.appendChild(span);
        items.appendChild(li);
    })
}

getData();

logo.addEventListener("click", ()=> {
    const itemsArray = items.querySelectorAll(".item")
    itemsArray.forEach((item) => {
        item.classList.remove("hidden");
    })
})

tshirt.addEventListener("click", ()=> {
    const itemsArray = items.querySelectorAll(".item")
    itemsArray.forEach((item) => {
        x = item.classList.contains("tshirt");
        if (!x) {
            item.classList.add("hidden");
        } else {
            item.classList.remove("hidden");
        }
    })
})

pants.addEventListener("click", ()=> {
    const itemsArray = items.querySelectorAll(".item")
    itemsArray.forEach((item) => {
        x = item.classList.contains("pants");
        if (!x) {
            item.classList.add("hidden");
        } else {
            item.classList.remove("hidden");
        }
    })
})

skirt.addEventListener("click", ()=> {
    const itemsArray = items.querySelectorAll(".item")
    itemsArray.forEach((item) => {
        x = item.classList.contains("skirt");
        if (!x) {
            item.classList.add("hidden");
        } else {
            item.classList.remove("hidden");
        }
    })
})

blue.addEventListener("click", ()=> {
    const itemsArray = items.querySelectorAll(".item")
    itemsArray.forEach((item) => {
        x = item.classList.contains("blue");
        if (!x) {
            item.classList.add("hidden");
        } else {
            item.classList.remove("hidden");
        }
    })
})

yellow.addEventListener("click", ()=> {
    const itemsArray = items.querySelectorAll(".item")
    itemsArray.forEach((item) => {
        x = item.classList.contains("yellow");
        if (!x) {
            item.classList.add("hidden");
        } else {
            item.classList.remove("hidden");
        }
    })
})

pink.addEventListener("click", ()=> {
    const itemsArray = items.querySelectorAll(".item")
    itemsArray.forEach((item) => {
        x = item.classList.contains("pink");
        if (!x) {
            item.classList.add("hidden");
        } else {
            item.classList.remove("hidden");
        }
    })
})
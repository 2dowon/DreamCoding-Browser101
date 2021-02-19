const game_btn = document.querySelector(".game_btn");
const game_btn_icon = game_btn.querySelector("i");
const game_timer = document.querySelector(".game_timer");
const carrot_count = document.querySelector(".carrot_count");
let carrot_num = carrot_count.querySelector("span");
const game_item = document.querySelector(".game_item");
const carrots = game_item.querySelectorAll(".carrot");
const bugs = game_item.querySelectorAll(".bug");
const game_alert = document.querySelector(".game_alert");
const game_result = game_alert.querySelector("span");
const game_restart = document.querySelector(".restart");
const sound_alert = new Audio("./sound/alert.wav");
const sound_bg = new Audio("./sound/bg.mp3");
const sound_bug = new Audio("./sound/bug_pull.mp3");
const sound_carrot = new Audio("./sound/carrot_pull.mp3");
const sound_game_win = new Audio("./sound/game_win.mp3");

function showAlert() {
    game_alert.style.visibility = "visible";
};

function gameStart() {
    sound_bg.currentTime = 0;
    sound_bg.play();
    game_btn.style.visibility = "visible";
    const timer = game_timer.querySelector("span");
    let time = 10;
    timerStart = setInterval(function () {
        if (time > 0) {
            time = time - 1;
            timer.innerText = `0:${time}`;
        } else if (time === 0) {
            showAlert();
            gameStop();
        };
    }, 1000);
};

function gameStop() {
    sound_bg.pause();
    game_btn.style.visibility = "hidden";
    clearInterval(timerStart);
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
};

let id = 0;
function landomItem() {
    const items = game_item.children;
    for (let i = 0; i < items.length; i++) {
        let top = getRandomInt(0, 200);
        let left = getRandomInt(0, 730);
        items[i].style.top = `${top}px`;
        items[i].style.left = `${left}px`;
        items[i].style.visibility = "visible";
        items[i].setAttribute("id", id);
        id ++;
    };
};

function countCarrot() {
    sound_carrot.play();
    carrot_num = carrot_count.innerText - 1;
    carrot_count.innerText = `${carrot_num}`;
    if (carrot_count.innerText == 0) {
        gameStop();
        showAlert();
        sound_game_win.play();
        game_result.innerText = "YOU WON 🥳";
    }
};

function clickCarrot(e) {
    countCarrot();
    const id = e.target.id;
    if (id) {
        const toBeDeleted = document.querySelector(`.carrot[id="${id}"]`);
        toBeDeleted.style.visibility = "hidden";
    };
};

function clickBug() {
    sound_bug.play();
    gameStop();
    showAlert();
    game_result.innerText = "YOU LOST 💩";
};

game_btn.addEventListener("click", (e)=> {
    if (e.target.className === "fas fa-play") {
        e.target.className = "fas fa-stop"
        carrot_count.innerText = "10";
        landomItem();
        gameStart();
    } else {
        gameStop();
        showAlert();
        game_result.innerText = "Relplay ❓";
    }
});

game_restart.addEventListener("click", (e) => {
    game_btn_icon.className = "fas fa-stop"
    game_alert.style.visibility = "hidden";
    carrot_count.innerText = "10";
    landomItem();
    gameStart();
});

for (const carrot of carrots) {
    carrot.addEventListener("click", (e) => {
        clickCarrot(e);
    });
};

for (const bug of bugs) {
    bug.addEventListener("click", clickBug);
};

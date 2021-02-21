'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 10;

const field = document.querySelector(".game_field");
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector(".game_btn");
const gameTimer = document.querySelector(".game_timer");
const gameScore = document.querySelector(".game_score");

const popUp = document.querySelector(".popup");
const popUpText = document.querySelector(".popup_message");
const popUpBtn = document.querySelector(".popup_btn");

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const alertSound = new Audio("./sound/alert.wav");
const bgSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener("click", onFieldClick);
gameBtn.addEventListener("click", () => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
})

popUpBtn.addEventListener("click", () => {
    startGame();
    hidePopUp();
})

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound);
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    showPopUpWithText('REPLAY❓');
    playSound(alertSound);
    stopSound(bgSound);
}

function finishGame(win) {
    started = false;
    hideGameButton();
    if (win) {
        playSound(winSound);
    } else {
        playSound(bugSound);
    }
    stopGameTimer();
    stopSound(bgSound);
    showPopUpWithText(win ? "YOU WON🎉" : "YOU LOST💩")
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = "visible";
}

function hideGameButton() {
    gameBtn.style.visibility = "hidden";
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame();
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000)
}

function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`
}

function showPopUpWithText(text) {
    popUpText.innerText = text;
    popUp.classList.remove('hide');
}

function hidePopUp() {
    popUp.classList.add('hide');
}

function initGame() {
    score = 0;
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    // 벌레와 당근을 생성한뒤 field에 추가해줌
    addItem('carrot', CARROT_COUNT, 'img/carrot.png')
    addItem('bug', BUG_COUNT, 'img/bug.png')
}

function onFieldClick(event) {
    // 게임이 시작되지 않았으면 당근,벌레를 클릭할 수 없으므로 빠르게 리턴
    if (!started) {
        return;
    }
    const target = event.target;
    if (target.matches(".carrot")) {
        // 당근!
        target.remove();
        score++
        playSound(carrotSound);
        updateScoreBoard();
        if (score === CARROT_COUNT) {
            finishGame(true);
        }
    } else if (target.matches(".bug")) {
        // 벌레!
        playSound(bugSound);
        finishGame(false);
    }
}

function playSound(sound) {
    sound.currtTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}

function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
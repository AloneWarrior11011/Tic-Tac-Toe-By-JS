let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGame = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");

let turnO = 0;
let count = 0; // for ensuring match will draw in some case.
const winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

function resetGame() {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const gameDraw = () => {
    msg.innerText = `Game Was a Draw....!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showWinner = (move) => {
    msg.innerText = `Congratulations, Winner is ${move}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

function checkWinner() {
    for (let pattern of winningPattern) {
        let move1 = boxes[pattern[0]].innerText;
        let move2 = boxes[pattern[1]].innerText;
        let move3 = boxes[pattern[2]].innerText;

        if (move1 != "" && move2 != "" && move3 != "") {
            if (move1 === move2 && move2 === move3) {
                showWinner(move1);
                return true;
            }
        }
    }
};
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO === true) {
            box.innerText = "0";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        // when I click the box it's set be disabled no further change once clicked.
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if (count === 9 && (isWinner == true)) {
            gameDraw();
        }
    });
});

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
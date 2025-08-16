const boxes = document.querySelectorAll(".box");
const turn = document.getElementById("turn");
const reset = document.getElementById("reset");

let turnX = false;
let gameOver = false;

const WinPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Box click
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "X" || box.innerText === "O" || gameOver) {
            return;
        }
        if (turnX) {
            box.innerText = "X";
            box.classList.add("boxX");
            turn.innerText = "Player 'O Turn";
            turnX = false;
        } else {
            box.innerText = "O";
            box.classList.add("boxO");
            turn.innerText = "Player 'X Turn";
            turnX = true;
        }
        checkWinner();
    });
});

// Check winner + draw
const checkWinner = () => {
    for (let patterns of WinPatterns) {
        let pos1 = boxes[patterns[0]].innerText;
        let pos2 = boxes[patterns[1]].innerText;
        let pos3 = boxes[patterns[2]].innerText;

        if (pos1 && pos1 === pos2 && pos2 === pos3) {
            turn.innerText = `${pos1} Won`;
            gameOver = true;
            boxes.forEach(b => b.classList.add("disabled"));
            return;
        }
    }

    // Draw check
    if ([...boxes].every(box => box.innerText !== "")) {
        turn.innerText = "It's a Draw!";
        gameOver = true;
        boxes.forEach(b => b.classList.add("disabled"));
    }
};

// Reset function 
const resetGame = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.classList.remove("boxX", "boxO", "disabled");
    });
    turn.innerText = "Player Move";
    turnX = false;
    gameOver = false;
};

reset.addEventListener("click", resetGame);

const tttBtn = document.getElementById("tttBtn");
const tttSection = document.getElementById("ticTacToeSection");
const boardDiv = document.getElementById("board");
const restartBtn = document.getElementById("restartBtn");

let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let currentPlayer = "X";

tttBtn.addEventListener("click", () => {
    tttSection.style.display = "block";
    renderBoard();
});

restartBtn.addEventListener("click", restartGame);

function renderBoard() {

    boardDiv.innerHTML = "";

    for (let i = 0; i < 9; i++) {

        const cell = document.createElement("div");

        cell.classList.add("cell");

        cell.textContent = board[i];

        cell.addEventListener("click", () => makeMove(i));

        boardDiv.appendChild(cell);
    }
}

function makeMove(index) {

    if (board[index] !== "") {
        return;
    }

    if (currentPlayer !== "X") {
        return;
    }

    board[index] = "X";

    renderBoard();

    if (checkWinner("X")) {
        setTimeout(() => alert("X Wins!"), 100);
        return;
    }

    if (isBoardFull()) {
        setTimeout(() => alert("Draw!"), 100);
        return;
    }

    currentPlayer = "O";

    setTimeout(aiMove, 500);
}

function aiMove() {

    nodesExplored = 0;

    const startTime = performance.now();

    const move = getBestMove(board);

    const endTime = performance.now();

    document.getElementById("decisionTime").textContent =
        (endTime - startTime).toFixed(2);

    document.getElementById("nodesExplored").textContent =
        nodesExplored;

    board[move] = "O";

    renderBoard();

    if (checkWinner("O")) {
        setTimeout(() => alert("AI Wins!"), 100);
        return;
    }

    if (isBoardFull()) {
        setTimeout(() => alert("Draw!"), 100);
        return;
    }

    currentPlayer = "X";
}

function checkWinner(player) {

    const wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],

        [0,3,6],
        [1,4,7],
        [2,5,8],

        [0,4,8],
        [2,4,6]
    ];

    for (let combo of wins) {

        const [a,b,c] = combo;

        if (
            board[a] === player &&
            board[b] === player &&
            board[c] === player
        ) {
            return true;
        }
    }

    return false;
}

function isBoardFull() {

    for (let cell of board) {

        if (cell === "") {
            return false;
        }
    }

    return true;
}

function restartGame() {

    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    currentPlayer = "X";

    renderBoard();
}
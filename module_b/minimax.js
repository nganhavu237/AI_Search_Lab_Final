/*
 * Minimax Algorithm
 *
 * Explores the complete game tree
 * and chooses the optimal move.
 */

let nodesExplored = 0;

function minimax(board, isMaximizing) {

    nodesExplored++;

    if (checkWinner("O")) {
        return 10;
    }

    if (checkWinner("X")) {
        return -10;
    }

    if (isBoardFullForMinimax(board)) {
        return 0;
    }

    if (isMaximizing) {

        let bestScore = -Infinity;

        for (let i = 0; i < 9; i++) {

            if (board[i] === "") {

                board[i] = "O";

                let score = minimax(board, false);

                board[i] = "";

                bestScore = Math.max(score, bestScore);
            }
        }

        return bestScore;

    } else {

        let bestScore = Infinity;

        for (let i = 0; i < 9; i++) {

            if (board[i] === "") {

                board[i] = "X";

                let score = minimax(board, true);

                board[i] = "";

                bestScore = Math.min(score, bestScore);
            }
        }

        return bestScore;
    }
}

function getBestMove(board) {

    let bestScore = -Infinity;
    let move = -1;

    for (let i = 0; i < 9; i++) {

        if (board[i] === "") {

            board[i] = "O";

            let score = minimax(board, false);

            board[i] = "";

            if (score > bestScore) {

                bestScore = score;
                move = i;
            }
        }
    }

    return move;
}

function isBoardFullForMinimax(board) {

    for (let cell of board) {

        if (cell === "") {
            return false;
        }
    }

    return true;
}
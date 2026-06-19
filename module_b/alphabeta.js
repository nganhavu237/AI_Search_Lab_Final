/*
 * Alpha-Beta Pruning Algorithm
 *
 * Improves Minimax efficiency by
 * pruning branches that cannot
 * affect the final decision.
 */

function alphaBeta(board, depth, alpha, beta, isMaximizing) {

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

                let score = alphaBeta(
                    board,
                    depth + 1,
                    alpha,
                    beta,
                    false
                );

                board[i] = "";

                bestScore = Math.max(bestScore, score);

                alpha = Math.max(alpha, score);

                if (beta <= alpha) {
                    break;
                }
            }
        }

        return bestScore;

    } else {

        let bestScore = Infinity;

        for (let i = 0; i < 9; i++) {

            if (board[i] === "") {

                board[i] = "X";

                let score = alphaBeta(
                    board,
                    depth + 1,
                    alpha,
                    beta,
                    true
                );

                board[i] = "";

                bestScore = Math.min(bestScore, score);

                beta = Math.min(beta, score);

                if (beta <= alpha) {
                    break;
                }
            }
        }

        return bestScore;
    }
}

function getBestMoveAlphaBeta(board) {

    let bestScore = -Infinity;
    let move = -1;

    for (let i = 0; i < 9; i++) {

        if (board[i] === "") {

            board[i] = "O";

            let score = alphaBeta(
                board,
                0,
                -Infinity,
                Infinity,
                false
            );

            board[i] = "";

            if (score > bestScore) {

                bestScore = score;
                move = i;
            }
        }
    }

    return move;
}
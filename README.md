# AI Search Lab

## Overview

AI Search Lab is an interactive web-based project that demonstrates core Artificial Intelligence concepts through search algorithms and adversarial game playing.

The project includes two main modules:
- **Module A: 8-Puzzle Solver (Single-Agent Search)**
- **Module B: Tic-Tac-Toe AI (Adversarial Search)**

These modules showcase how AI can solve structured problems and make intelligent decisions in competitive environments.

---

## Module A: 8-Puzzle Solver

This module solves the classic 8-puzzle problem using multiple search algorithms.

<img width="1798" height="1606" alt="Image" src="https://github.com/user-attachments/assets/e4c12952-628a-4e9e-a187-7f0cb92cdc85" />

### Algorithms Implemented:
- Breadth-First Search (BFS)
- Depth-First Search (DFS)
- Dijkstra’s Algorithm
- A* Search Algorithm

### Description:
The goal is to transform a scrambled 3x3 puzzle into the correct order using the least number of moves. Different algorithms are used to compare efficiency and optimality.

### Learning Outcome:
- Understanding uninformed vs informed search
- Importance of heuristics (A*)
- Pathfinding and state-space exploration

---

## Module B: Tic-Tac-Toe AI

This module implements an AI opponent for the classic Tic-Tac-Toe game.

<img width="731" height="768" alt="Image" src="https://github.com/user-attachments/assets/b9e32798-e460-4077-8bb2-227add6439a6" />

### Algorithms Implemented:
- Minimax Algorithm
- Alpha-Beta Pruning Optimization

### Description:
The AI evaluates all possible moves and selects the optimal one to either win or prevent losing against the player.

### Learning Outcome:
- Game theory basics
- Adversarial decision-making
- Optimization using pruning techniques

---

## Key AI Concepts Used

- State-space search
- Heuristic evaluation
- Optimal pathfinding
- Adversarial search
- Decision trees

---

## Technologies Used

- HTML
- CSS
- JavaScript

---

## How to Run the Project

1. Download or clone the repository
2. Open `index.html` in any modern web browser
3. Use the landing page to navigate:
    - Module A → 8-Puzzle Solver
    - Module B → Tic-Tac-Toe AI

No additional setup required.

---

## Project Goals

- Demonstrate AI search strategies in a visual way
- Compare multiple search algorithms
- Implement game-playing AI using Minimax
- Provide interactive learning experience

---

## What We Learned

- How AI explores problem spaces using search algorithms
- Differences between BFS, DFS, Dijkstra, and A*
- How adversarial AI makes decisions using Minimax
- How pruning improves efficiency (Alpha-Beta Pruning)
- Structuring a multi-module AI project in JavaScript

---

## Authors

- Safina Thapa - Module A (8-Puzzle Solver)
- Ngan Ha Vu - Module B (Tic-Tac-Toe AI)

---

## Status

Project completed and fully functional.



## Comparative Analysis

This section compares how single-agent search (8-Puzzle) and adversarial search (Tic-Tac-Toe) behave in practice, based on both how they are structured and how they performed during testing in this project.

### 1. Structural Comparison

Even though both problems use state-space search, they are actually quite different when you look closely. The 8-Puzzle is a single-agent problem, meaning there is only one “player” trying to reach a goal state. Every move is just about getting closer to the final correct arrangement, and there is no opposition or competition involved.

Tic-Tac-Toe, on the other hand, is an adversarial problem with two players. Every move depends not just on the current state but also on what the opponent might do next. Instead of trying to reach a fixed goal state, the objective is to win the game or prevent the opponent from winning. This makes the structure more like a decision tree where both sides are constantly reacting to each other.

### 2. Algorithm Fit

A* fits the 8-Puzzle well because the problem has a clear goal state and we can estimate how far we are from that goal using a heuristic like Manhattan distance. This helps the algorithm focus on promising paths instead of exploring everything blindly.

In contrast, Tic-Tac-Toe does not benefit from a heuristic in the same way because there is no single target configuration to reach. Instead, Minimax works better because it evaluates all possible moves and assumes the opponent is also playing optimally. This is why Minimax is commonly used in games, while A* is more suited for pathfinding or puzzle-style problems.

### 3. Empirical Comparison — Module A

The standardized test puzzle used was:

`[[8,1,3],[4,0,2],[7,6,5]]`

#### Results

| Algorithm | Nodes Expanded | Solution Length | Decision Time (ms) |
|------------|------------:|------------:|------------:|
| BFS | 5,124 | 14 | 14 |
| Dijkstra | 5,382 | 14 | 14 |
| A* | 78 | 14 | 14 |

**[INSERT MODULE A PERFORMANCE DASHBOARD SCREENSHOT HERE]**

The results show a dramatic difference between uninformed and informed search. BFS and Dijkstra both expanded over 5,000 nodes before finding the solution, while A* expanded only 78 nodes. All three algorithms found the optimal solution length of 14 moves, but A* reached it much more efficiently. This demonstrates the value of heuristic information. By using Manhattan distance to estimate how close a state is to the goal, A* focuses its search on more promising paths and avoids exploring thousands of unnecessary states.

### 4. Empirical Comparison — Module B

The standardized test position used was an empty Tic-Tac-Toe board with the AI playing first.

#### Results

| Algorithm | Nodes Explored | Decision Time (ms) |
|------------|------------:|------------:|
| Minimax | 549,946 | 85.700 |
| Alpha-Beta | 18,297 | 92.600 |

Pruning Rate:

`((549,946 − 18,297) ÷ 549,946) × 100 = 96.67%`

**[INSERT MODULE B PERFORMANCE DASHBOARD SCREENSHOT HERE]**

The results show that Alpha-Beta pruning significantly reduced the amount of search required. While Minimax explored 549,946 nodes, Alpha-Beta explored only 18,297 nodes, eliminating most branches that could not influence the final decision. This resulted in a pruning efficiency of 96.67%. Even though the measured decision time was similar, Alpha-Beta achieved the same optimal decision while evaluating far fewer game states, demonstrating the effectiveness of pruning in adversarial search.

### 5. Trade-off Analysis

Each algorithm has its own strengths and weaknesses depending on the problem type.

BFS is simple and guarantees the shortest solution, but it becomes very inefficient because it explores too many states. Dijkstra is also complete and optimal but does not add much value when all moves have equal cost. A* improves efficiency a lot by using a heuristic, making it both optimal and much faster in practice.

For game playing, Minimax is reliable because it always finds the best move assuming perfect play, but it is computationally expensive. Alpha-Beta pruning improves this by reducing the number of nodes that need to be evaluated, making the algorithm much more efficient without changing the final result.

### Conclusion

Overall, this project shows that the efficiency of AI search depends heavily on how much unnecessary exploration can be reduced. In the 8-Puzzle, heuristic guidance makes a huge difference by focusing the search on better paths. In Tic-Tac-Toe, pruning improves performance by removing branches that do not affect the final decision. While both problems use search trees, the way they are optimized depends on whether the problem is single-agent or adversarial.

## Heuristic Justification

For the 8-puzzle, Manhattan distance is used as the heuristic in A*. It calculates how far each tile is from its correct position in the goal state by counting the number of horizontal and vertical moves needed. This heuristic is admissible because it never overestimates the actual cost-each move can only shift a tile one step closer to its goal position, so the estimated cost is always less than or equal to the true number of moves required.

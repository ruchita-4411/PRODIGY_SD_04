const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Function to check if a number can be placed in a cell
function isValid(board, row, col, num) {
    // Check row
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
        if (board[x][col] === num) return false;
    }

    // Check 3x3 box
    let startRow = row - row % 3;
    let startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) return false;
        }
    }

    return true;
}

// Backtracking solver function
function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// API endpoint to solve Sudoku
app.post('/api/solve', (req, res) => {
    const board = req.body.board;
    
    if (!board || !Array.isArray(board) || board.length !== 9) {
        return res.status(400).json({ error: 'Invalid board format' });
    }

    // Create a deep copy of the board
    const boardCopy = JSON.parse(JSON.stringify(board));
    
    if (solveSudoku(boardCopy)) {
        res.json({ solution: boardCopy });
    } else {
        res.status(400).json({ error: 'No solution exists' });
    }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 
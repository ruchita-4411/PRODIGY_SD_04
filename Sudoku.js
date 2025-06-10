import React, { useState } from 'react';
import './Sudoku.css';

const Sudoku = () => {
    const [board, setBoard] = useState(Array(9).fill().map(() => Array(9).fill(0)));
    const [solvedBoard, setSolvedBoard] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCellChange = (row, col, value) => {
        const newValue = value === '' ? 0 : parseInt(value);
        if (isNaN(newValue) || newValue < 0 || newValue > 9) return;

        const newBoard = board.map(row => [...row]);
        newBoard[row][col] = newValue;
        setBoard(newBoard);
        setSolvedBoard(null);
        setError('');
    };

    const solvePuzzle = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:5002/api/solve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ board }),
            });

            const data = await response.json();
            if (response.ok) {
                setSolvedBoard(data.solution);
            } else {
                setError(data.error || 'Failed to solve the puzzle');
            }
        } catch (err) {
            setError('Error connecting to the server');
        }
        setIsLoading(false);
    };

    const resetBoard = () => {
        setBoard(Array(9).fill().map(() => Array(9).fill(0)));
        setSolvedBoard(null);
        setError('');
    };

    const renderCell = (row, col) => {
        const value = solvedBoard ? solvedBoard[row][col] : board[row][col];
        const isInitial = board[row][col] !== 0;
        
        return (
            <input
                type="number"
                min="1"
                max="9"
                value={value || ''}
                onChange={(e) => handleCellChange(row, col, e.target.value)}
                className={`cell ${isInitial ? 'initial' : ''}`}
                disabled={!!solvedBoard}
            />
        );
    };

    return (
        <div className="sudoku-container">
            <h1>Sudoku Solver</h1>
            <div className="board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((_, colIndex) => (
                            <div key={colIndex}>
                                {renderCell(rowIndex, colIndex)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="controls">
                <button onClick={solvePuzzle} disabled={isLoading}>
                    {isLoading ? 'Solving...' : 'Solve'}
                </button>
                <button onClick={resetBoard} disabled={isLoading}>
                    Reset
                </button>
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Sudoku; 
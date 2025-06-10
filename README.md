# Sudoku Solver

A full-stack Sudoku solver application with a beautiful and responsive user interface. The application uses a backtracking algorithm to solve Sudoku puzzles efficiently.

## Features

- Interactive 9x9 Sudoku grid
- Real-time input validation
- Efficient backtracking algorithm for solving puzzles
- Responsive design that works on both desktop and mobile devices
- Beautiful and modern UI with smooth animations
- Error handling and user feedback

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sudoku-solver
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

## Running the Application

1. Start the backend server:
```bash
npm run dev
```

2. In a new terminal, start the frontend development server:
```bash
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Usage

1. Enter numbers (1-9) in the Sudoku grid cells
2. Click the "Solve" button to find the solution
3. Use the "Reset" button to clear the grid and start over

## Technologies Used

- Frontend:
  - React
  - CSS3 with modern features
  - Responsive design

- Backend:
  - Node.js
  - Express
  - Backtracking algorithm

## License

MIT 
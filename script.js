const board = document.getElementById('board');
const rollDiceBtn = document.getElementById('rollDiceBtn');
const diceResult = document.getElementById('diceResult');
const player1Piece = document.getElementById('player1-piece');
const player2Piece = document.getElementById('player2-piece');

let currentPlayer = 1;
let positions = { player1: 0, player2: 0 };
const boardSize = 100;  // 10x10 grid

// Snakes and ladders data (position and target)
const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };

// Create the board
function createBoard() {
    for (let i = 1; i <= boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.innerHTML = i;

        // Add snakes and ladders
        if (snakes[i]) {
            cell.classList.add(`snake-${i}-${snakes[i]}`);
        } else if (ladders[i]) {
            cell.classList.add(`ladder-${i}-${ladders[i]}`);
        }

        board.appendChild(cell);
    }
}

// Roll the dice
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// Move player
function movePlayer(player, steps) {
    let newPos = positions[player] + steps;
    if (newPos > boardSize) {
        newPos = positions[player];  // Don't move if it exceeds the board
    }

    if (snakes[newPos]) {
        newPos = snakes[newPos];  // Move down if snake
    } else if (ladders[newPos]) {
        newPos = ladders[newPos];  // Move up if ladder
    }

    positions[player] = newPos;
    updatePlayerPosition(player, newPos);

    // Check for win condition
    if (newPos === boardSize) {
        alert(`Player ${currentPlayer} wins!`);
        resetGame();
    }
}

// Update player's piece position
function updatePlayerPosition(player, pos) {
    const cells = document.querySelectorAll('.cell');
    const playerPiece = player === 'player1' ? player1Piece : player2Piece;
    const targetCell = cells[pos - 1];
    targetCell.appendChild(playerPiece);
}

// Switch turn to the next player
function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

// Reset the game
function resetGame() {
    positions = { player1: 0, player2: 0 };
    updatePlayerPosition('player1', 0);
    updatePlayerPosition('player2', 0);
    currentPlayer = 1;
    diceResult.innerText = 'Roll to Start';
}

// Handle dice roll and move
rollDiceBtn.addEventListener('click', () => {
    const diceValue = rollDice();
    diceResult.innerText = `Player ${currentPlayer} rolled: ${diceValue}`;
    movePlayer(`player${currentPlayer}`, diceValue);
    switchPlayer();
});

// Initialize the game
createBoard();
resetGame();

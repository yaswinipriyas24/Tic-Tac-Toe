// Get references to HTML elements
const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const gameMessage = document.getElementById('gameMessage');
const resetButton = document.getElementById('resetButton');

// Get references to new popup elements
const celebrationPopup = document.getElementById('celebrationPopup');
const popupMessage = document.getElementById('popupMessage');
const playAgainButton = document.getElementById('playAgainButton');

// Game state variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Winning conditions
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle a cell being clicked
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());

    checkResult();
}

// Function to check if the game has ended (win or draw)
function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameMessage.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        showPopup(`Player ${currentPlayer} Wins!`); // Show popup on win
        return;
    }

    const roundDraw = !board.includes('');
    if (roundDraw) {
        gameMessage.textContent = 'It\'s a Draw!';
        gameActive = false;
        showPopup('It\'s a Draw!'); // Show popup on draw
        return;
    }

    switchPlayer();
}

// Function to switch the current player
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameMessage.textContent = `It's Player ${currentPlayer}'s turn`;
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    gameMessage.textContent = `It's Player ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });

    hidePopup(); // Hide the popup when resetting the game
}

// Function to show the celebration popup
function showPopup(message) {
    popupMessage.textContent = message; // Set the message in the popup
    celebrationPopup.classList.add('show'); // Add 'show' class to make it visible
}

// Function to hide the celebration popup
function hidePopup() {
    celebrationPopup.classList.remove('show'); // Remove 'show' class to hide it
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
playAgainButton.addEventListener('click', resetGame); // Event listener for the "Play Again" button

// Initialize the game message when the page loads
window.onload = resetGame;

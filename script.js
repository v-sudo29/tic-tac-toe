// Global variables
const switchButton = document.querySelector('.switch-button');

// Global module
const gameModule = (() => {

  // Array holds markers
  const gameBoard = ['', '', '', '', '', '', '', '', ''];

  // Display game board tiles
  const displayBoard = () => {
    const boardContainer = document.querySelector('.gameboard-container');
    for (let i = 0; i < 9; i++) {
      const tile = document.createElement('div');
      tile.setAttribute('id', `${i}`);
      tile.classList.add('tile', 'empty');
      tile.innerHTML = gameBoard[i];
      boardContainer.appendChild(tile);
    }
  };
  return {gameBoard, displayBoard};
})();

// Player factory
const playerFactory = (name, marker) => ({ name, marker });

// Create player


gameModule.displayBoard();

// Listen for user click, populate tile with marker
const allTiles = document.querySelectorAll('.tile');
allTiles.forEach(gameTile => {
  gameTile.addEventListener('click', () => {
    gameTile.innerHTML = 'X';
    gameTile.classList.remove('empty');
  });
});

// Listen for button click to switch markers
switchButton.addEventListener('click', () => {
  const markerOne = document.querySelector('.marker-one');
  const markerTwo = document.querySelector('.marker-two');
  if (markerOne.innerHTML === 'X') {
    markerOne.innerHTML = 'O';
    markerTwo.innerHTML = 'X';
  } else if (markerOne.innerHTML === 'O') {
    markerOne.innerHTML = 'X';
    markerTwo.innerHTML = 'O';
  }
});
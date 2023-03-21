// Global variables
const switchButton = document.querySelector('.switch-button');
const allTiles = document.querySelectorAll('.tile');

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

  // Switch markers
  const switchMarkers = () => {
    const markerOne = document.querySelector('.marker-one');
    const markerTwo = document.querySelector('.marker-two');
    if (markerOne.innerHTML === 'X') {
      markerOne.innerHTML = 'O';
      markerTwo.innerHTML = 'X';
    } else if (markerOne.innerHTML === 'O') {
      markerOne.innerHTML = 'X';
      markerTwo.innerHTML = 'O';
    }
  }

  // Populate empty tile with marker
  const populate = (emptyTile) => {
      emptyTile.addEventListener('click', () => {
        emptyTile.innerHTML = 'X';
        emptyTile.classList.remove('empty');
    });
  }

  return {gameBoard, displayBoard, switchMarkers, populate};
})();

// Player factory
const playerFactory = (name, marker) => ({ name, marker });

// Display tile board
gameModule.displayBoard();

// Listen for user click, populate tile with marker
allTiles.forEach((gameTile) => gameModule.populate(gameTile));

// Listen for button click to switch markers
switchButton.addEventListener('click', gameModule.switchMarkers);
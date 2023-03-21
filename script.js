// Global variables
const switchButton = document.querySelector('.switch-button');
const startButton = document.querySelector('.start-button');

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
  };

  // Populate empty tile with marker
  const populate = (gameTile) => {
      gameTile.addEventListener('click', () => {
        gameTile.innerHTML = 'X';
        gameTile.classList.remove('empty');
    });
  };

  return {gameBoard, displayBoard, switchMarkers, populate};
})();

// Player factory
const playerFactory = (name, marker) => ({ name, marker });

// FUNCTION: create players
const createPlayers = () => {

  // Get finalized markers from DOM
  const markerOne = document.querySelector('.marker-one').innerHTML;
  const markerTwo = document.querySelector('.marker-two').innerHTML;

  const playerOne = playerFactory('player one', markerOne);
  const playerTwo = playerFactory('player two', markerTwo);
};

// FUNCTION : clear middle footer
const clearMiddleFooter = () => {
  const middleFooterDiv = document.querySelector('.middle-footer');
  while (middleFooterDiv.hasChildNodes()) {
    middleFooterDiv.removeChild(middleFooterDiv.childNodes[0]);
  }
}
// Display tile board
gameModule.displayBoard();

// BUTTON: Switch markers
switchButton.addEventListener('click', gameModule.switchMarkers);

// BUTTON: Start game
startButton.addEventListener('click', () =>{
  createPlayers();
  clearMiddleFooter();
});

// Listen for user click, populate tile with marker
const allTiles = document.querySelectorAll('.tile');
allTiles.forEach((gameTile) => gameModule.populate(gameTile));
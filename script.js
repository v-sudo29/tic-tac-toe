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

  // Populate empty tile with current player's marker
  const populate = (gameTile) => {
      gameTile.addEventListener('click', () => {
        const markerOne = document.querySelector('.marker-one').innerHTML;
        const markerTwo = document.querySelector('.marker-two').innerHTML;
        const middleFooterContent = document.querySelector('.middle-footer');
        const childDiv = middleFooterContent.firstChild;

        if (childDiv.classList.contains('player-one-announcer') === true) {
          gameTile.innerHTML = `${markerOne}`;
          gameTile.classList.remove('empty');
          childDiv.innerHTML = 'Player Two\'s turn';
          childDiv.classList.remove('player-one-announcer');
          childDiv.classList.add('player-two-announcer');
        } else if (childDiv.classList.contains('player-two-announcer') === true) {
          gameTile.innerHTML = `${markerTwo}`;
          gameTile.classList.remove('empty');
          childDiv.innerHTML = 'Player One\'s turn';
          childDiv.classList.remove('player-two-announcer');
          childDiv.classList.add('player-one-announcer');
        }
    });
  };

  // Insert announcer
  const insertAnnouncer = () => {
    const middleFooterDiv = document.querySelector('.middle-footer');
    const announcer = document.createElement('div');
    const text = document.createTextNode('Player One\'s turn');
    announcer.classList.add('player-one-announcer');
    announcer.appendChild(text);
    middleFooterDiv.appendChild(announcer);
  }
  
  // Clear middle footer
  const clearMiddleFooter = () => {
    const middleFooterDiv = document.querySelector('.middle-footer');
    while (middleFooterDiv.hasChildNodes()) {
      middleFooterDiv.removeChild(middleFooterDiv.childNodes[0]);
    }
  }
  return {gameBoard, 
          displayBoard, 
          switchMarkers, 
          populate, 
          clearMiddleFooter, 
          insertAnnouncer};
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

// FUNCTION: announce winner when a player has won
const announceWinner = () => {
  const winner = null;
}

// Display tile board
gameModule.displayBoard();

// BUTTON: Switch markers
switchButton.addEventListener('click', gameModule.switchMarkers);

// BUTTON: Start game
startButton.addEventListener('click', () => {

  // Create players and insert announcer
  createPlayers();
  gameModule.clearMiddleFooter();
  gameModule.insertAnnouncer();

  // Players can populate tiles
  const allTiles = document.querySelectorAll('.tile');
  allTiles.forEach((gameTile) => gameModule.populate(gameTile));  
});
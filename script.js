// Global variables
const switchButton = document.querySelector('.switch-button');
const startButton = document.querySelector('.start-button');

// Global module
const gameModule = (() => {

  // Array holds markers
  const gameBoard = ['', '', '', '', '', '', '', '', ''];

  // FUNCTION: check if a player has won
  const checkWinner = () => {
    const winner = null;
    const markerOne = document.querySelector('.marker-one').innerHTML;
    const markerTwo = document.querySelector('.marker-two').innerHTML;
    const announcer = document.querySelector('.announcer');

    // Horizontal match
    if ((gameBoard[0] === markerOne) && (gameBoard[1] === markerOne) && (gameBoard[2] === markerOne)) {
      console.log('Player One wins!');
    } else if ((gameBoard[3] === markerOne) && (gameBoard[4] === markerOne) && (gameBoard[5] === markerOne)) {
      console.log('Player One wins!');
    } else if (gameBoard[6] === markerOne && gameBoard[7] === markerOne && gameBoard[8] === markerOne) {
      console.log('Player One wins!');
    }

    if ((gameBoard[0] === markerTwo) && (gameBoard[1] === markerTwo) && (gameBoard[2] === markerTwo)) {
      console.log('Player Two wins!');
    } else if ((gameBoard[3] === markerTwo) && (gameBoard[4] === markerTwo) && (gameBoard[5] === markerTwo)) {
      console.log('Player Two wins!');
    } else if (gameBoard[6] === markerTwo && gameBoard[7] === markerTwo && gameBoard[8] === markerTwo) {
      console.log('Player Two wins!');
    }

    // Vertical match
    if (gameBoard[0] === markerOne && gameBoard[3] === markerOne && gameBoard[6] === markerOne) {
      console.log('Player One wins!');
    } else if (gameBoard[1] === markerOne && gameBoard[4] === markerOne && gameBoard[7] === markerOne) {
      console.log('Player One wins!');
    } else if (gameBoard[2] === markerOne && gameBoard[5] === markerOne && gameBoard[8] === markerOne) {
      console.log('Player One wins!');
    }

    if ((gameBoard[0] === markerTwo) && (gameBoard[3] === markerTwo) && (gameBoard[6] === markerTwo)) {
      console.log('Player Two wins!');
    } else if ((gameBoard[1] === markerTwo) && (gameBoard[4] === markerTwo) && (gameBoard[7] === markerTwo)) {
      console.log('Player Two wins!');
    } else if ((gameBoard[2] === markerTwo) && (gameBoard[5] === markerTwo) && (gameBoard[8] === markerTwo)) {
      console.log('Player Two wins!');
    }

    // Diagonal match
    if (gameBoard[0] === markerOne && gameBoard[4] === markerOne && gameBoard[8] === markerOne) {
      console.log('Player One wins!');
    } else if (gameBoard[2] === markerOne && gameBoard[4] === markerOne && gameBoard[6] === markerOne) {
      console.log('Player One wins!');
    }

    if ((gameBoard[0] === markerTwo) && (gameBoard[4] === markerTwo) && (gameBoard[8] === markerTwo)) {
      console.log('Player Two wins!');
    } else if (gameBoard[2] === markerTwo && gameBoard[4] === markerTwo && gameBoard[6] === markerTwo) {
      console.log('Player Two wins!');
    }
  }

  // Display game board tiles
  const displayBoard = () => {
    const boardContainer = document.querySelector('.gameboard-container');
    for (let i = 0; i < 9; i++) {
      const tile = document.createElement('div');
      tile.setAttribute('id', `${i}`);
      tile.classList.add('tile');
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

    // Add hover
    gameTile.classList.add('empty');

      // Event listener to populate tile
      gameTile.addEventListener('click', () => {
        const markerOne = document.querySelector('.marker-one').innerHTML;
        const markerTwo = document.querySelector('.marker-two').innerHTML;
        const middleFooterContent = document.querySelector('.middle-footer');
        const childDiv = middleFooterContent.firstChild;
        const index = gameTile.id;

        if (childDiv.classList.contains('player-one-announcer') && gameTile.classList.contains('empty')) {
          // Update tile HTML
          gameTile.innerHTML = `${markerOne}`;
          gameTile.classList.remove('empty');

          // Update announcer HTML
          childDiv.innerHTML = 'Player Two\'s turn';
          childDiv.classList.remove('player-one-announcer');
          childDiv.classList.add('player-two-announcer');

          // Update array
          gameBoard[index] = `${markerOne}`;

          // Check winner
          checkWinner();

        } else if (childDiv.classList.contains('player-two-announcer') && gameTile.classList.contains('empty')) {
          // Update tile HTML
          gameTile.innerHTML = `${markerTwo}`;
          gameTile.classList.remove('empty');

          // Update announcer HTML
          childDiv.innerHTML = 'Player One\'s turn';
          childDiv.classList.remove('player-two-announcer');
          childDiv.classList.add('player-one-announcer');

          // Update array
          gameBoard[index] = `${markerTwo}`;

          // Check winner
          checkWinner();
        }
    });
  };

  // Insert announcer
  const insertAnnouncer = () => {
    const middleFooterDiv = document.querySelector('.middle-footer');
    const announcer = document.createElement('div');
    const text = document.createTextNode('Player One\'s turn');
    announcer.classList.add('announcer','player-one-announcer');
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
          insertAnnouncer,
          checkWinner
        };
})();

// Player factory
const playerFactory = (name, marker) => ({ name, marker });

// FUNCTION: create players
const createPlayers = () => {

  // Get finalized markers from DOM
  const markerOne = document.querySelector('.marker-one').innerHTML;
  const markerTwo = document.querySelector('.marker-two').innerHTML;

  const playerOne = playerFactory('Player One', markerOne);
  const playerTwo = playerFactory('Player Two', markerTwo);

  return (playerOne, playerTwo);
};

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
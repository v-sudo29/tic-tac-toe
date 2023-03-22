/* eslint-disable no-underscore-dangle */
// Global variables
const switchButton = document.querySelector('.switch-button');
const startButton = document.querySelector('.start-button');

// Global module
const gameModule = (() => {

  // Array holds markers
  const gameBoard = ['', '', '', '', '', '', '', '', ''];

  // Array holds players
  const currentPlayers = [];

  // FUNCTION: disable tiles
  const _disableTiles = () => {
    const allEmptyTiles = document.querySelectorAll('.empty');
    allEmptyTiles.forEach((tile) => tile.classList.remove('empty'));
  }

  // FUNCTION: announce winner
  const _announceWinner = (winner) => {
    document.querySelector('.announcer').innerHTML = `${winner} wins!`;
  };

  // FUNCTION: check if a player has won
  const _checkWinner = () => {
    const markerOne = document.querySelector('.marker-one').innerHTML;
    const markerTwo = document.querySelector('.marker-two').innerHTML;
    const playerOne = currentPlayers[0].name;
    const playerTwo = currentPlayers[1].name;

    // Horizontal match
    if ((gameBoard[0] === markerOne) && (gameBoard[1] === markerOne) && (gameBoard[2] === markerOne) ||
      (gameBoard[3] === markerOne) && (gameBoard[4] === markerOne) && (gameBoard[5] === markerOne) ||
      ((gameBoard[6] === markerOne) && (gameBoard[7] === markerOne) && (gameBoard[8] === markerOne))) {
        _announceWinner(playerOne);
        _disableTiles();
    } else if ((gameBoard[0] === markerTwo) && (gameBoard[1] === markerTwo) && (gameBoard[2] === markerTwo)
      (gameBoard[3] === markerTwo) && (gameBoard[4] === markerTwo) && (gameBoard[5] === markerTwo)
      (gameBoard[6] === markerTwo && gameBoard[7] === markerTwo && gameBoard[8] === markerTwo)) {
        _announceWinner(playerTwo);
        _disableTiles();
    } 

    // Vertical match
    if (gameBoard[0] === markerOne && gameBoard[3] === markerOne && gameBoard[6] === markerOne) {
      _announceWinner(playerOne);
      _disableTiles();
    } else if (gameBoard[1] === markerOne && gameBoard[4] === markerOne && gameBoard[7] === markerOne) {
      _announceWinner(playerOne);
      _disableTiles();
    } else if (gameBoard[2] === markerOne && gameBoard[5] === markerOne && gameBoard[8] === markerOne) {
      _announceWinner(playerOne);
      _disableTiles();
    }

    if ((gameBoard[0] === markerTwo) && (gameBoard[3] === markerTwo) && (gameBoard[6] === markerTwo)) {
      _announceWinner(playerTwo);
      _disableTiles();
    } else if ((gameBoard[1] === markerTwo) && (gameBoard[4] === markerTwo) && (gameBoard[7] === markerTwo)) {
      _announceWinner(playerTwo);
      _disableTiles();
    } else if ((gameBoard[2] === markerTwo) && (gameBoard[5] === markerTwo) && (gameBoard[8] === markerTwo)) {
      _announceWinner(playerTwo);
      _disableTiles();
    }

    // Diagonal match
    if (gameBoard[0] === markerOne && gameBoard[4] === markerOne && gameBoard[8] === markerOne) {
      _announceWinner(playerOne);
      _disableTiles();
    } else if (gameBoard[2] === markerOne && gameBoard[4] === markerOne && gameBoard[6] === markerOne) {
      _announceWinner(playerOne);
      _disableTiles();
    }

    if ((gameBoard[0] === markerTwo) && (gameBoard[4] === markerTwo) && (gameBoard[8] === markerTwo)) {
      _announceWinner(playerTwo);
      _disableTiles();
    } else if (gameBoard[2] === markerTwo && gameBoard[4] === markerTwo && gameBoard[6] === markerTwo) {
      _announceWinner(playerTwo);
      _disableTiles();
    }
  }

  // FUNCTION: create players
  const createPlayers = () => {

    // Get finalized markers from DOM
    const markerOne = document.querySelector('.marker-one').innerHTML;
    const markerTwo = document.querySelector('.marker-two').innerHTML;
    const one = playerFactory('Player One', markerOne);
    const two = playerFactory('Player Two', markerTwo);

    // Add players to currentPlayers array
    currentPlayers.push(one, two);
  };

  // FUNCTION: Display game board tiles
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

  // FUNCTION: Switch markers
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

  // FUNCTION: Show marker when hover
  const showMarkerHover = (tile) => {
    const markerOne = document.querySelector('.marker-one').innerHTML;
    const markerTwo = document.querySelector('.marker-two').innerHTML;
    const announcerClassList = document.querySelector('.announcer').classList;
    tile.classList.add('empty');

    tile.addEventListener('mouseover', () => {
      if (announcerClassList.contains('player-one-announcer') && tile.classList.contains('empty')) {
        tile.innerHTML = markerOne;
      } else if (announcerClassList.contains('player-two-announcer') && tile.classList.contains('empty')) {
        tile.innerHTML = markerTwo;
      }
    });
    tile.addEventListener('mouseleave', () => {
      if (announcerClassList.contains('player-one-announcer') && tile.classList.contains('empty')) {
        tile.innerHTML = '';
      } else if (announcerClassList.contains('player-two-announcer') && tile.classList.contains('empty')) {
        tile.innerHTML = '';
      }
    });
  }

  // FUNCTION: Populate empty tile with current player's marker
  const populate = (gameTile) => {

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
          _checkWinner();

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
          _checkWinner();
        }
    });
  };

  // FUNCTION: Insert announcer
  const insertAnnouncer = () => {
    const middleFooterDiv = document.querySelector('.middle-footer');
    const announcer = document.createElement('div');
    const text = document.createTextNode('Player One\'s turn');
    announcer.classList.add('announcer','player-one-announcer');
    announcer.appendChild(text);
    middleFooterDiv.appendChild(announcer);
  }

  // FUNCTION: Insert restart button
  const insertRestartButton = () => {
    const middleFooterDiv = document.querySelector('.middle-footer');
    const newRestartButton = document.createElement('button');
    newRestartButton.classList.add('restart-button');
    newRestartButton.innerHTML = 'Restart';
    middleFooterDiv.appendChild(newRestartButton);

    // Add event listener to restart button
    const restartButton = document.querySelector('.restart-button');
    restartButton.addEventListener('click', () => {

      // Reset announcer
      const announcer = document.querySelector('.announcer');

      if (announcer.classList.contains('player-one-announcer')) {
        announcer.innerHTML = 'Player One\'s turn';
      } else if (announcer.classList.contains('player-two-announcer')) {
        announcer.innerHTML = 'Player One\'s turn';
      }

      // Reset all tiles to empty and clear markers
      const tiles = document.querySelectorAll('.tile');
      tiles.forEach((tile) => {

        if (tile.classList.contains('empty') === false) {
          tile.classList.add('empty');
          tile.innerHTML = '';
        }
      });

      // Reset gameBoard array
      for (let i = 0; i < 9; i++) {
        gameBoard[i] = '';
      }
    });
  }
  
  // FUNCTION: Clear middle footer
  const clearMiddleFooter = () => {
    const middleFooterDiv = document.querySelector('.middle-footer');
    while (middleFooterDiv.hasChildNodes()) {
      middleFooterDiv.removeChild(middleFooterDiv.childNodes[0]);
    }
  }

  return {gameBoard, 
          displayBoard, 
          switchMarkers,
          createPlayers, 
          populate, 
          clearMiddleFooter, 
          insertAnnouncer,
          showMarkerHover,
          insertRestartButton
        };
})();

// Player factory
const playerFactory = (name, marker) => ({ name, marker });

// Display tile board
gameModule.displayBoard();

// BUTTON: Switch markers
switchButton.addEventListener('click', gameModule.switchMarkers);

// BUTTON: Start game
startButton.addEventListener('click', () => {

  // Create players and insert announcer
  gameModule.createPlayers();
  gameModule.clearMiddleFooter();
  gameModule.insertAnnouncer();
  gameModule.insertRestartButton();

  // Players can populate tiles
  const allTiles = document.querySelectorAll('.tile');
  allTiles.forEach((gameTile) => {
    gameModule.showMarkerHover(gameTile);
    gameModule.populate(gameTile);
  });  
});
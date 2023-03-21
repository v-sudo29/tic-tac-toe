// Global module
const gameModule = (() => {

  // Array holds markers
  const gameBoard = ["X", "O", "O", "X", "X", "O", "X", "X", "X"];

  // Display game board tiles
  const displayBoard = () => {
    const boardContainer = document.querySelector('.gameboard-container');
    for (let i = 0; i < 9; i++) {
      const tile = document.createElement('div');
      tile.setAttribute('id', `${i}`);
      tile.setAttribute('class', "tile");
      tile.innerHTML = gameBoard[i];
      boardContainer.appendChild(tile);
    }
  };
  return {gameBoard, displayBoard};
})();

// Players
const playerFactory = (name, marker) => {
  // code goes here
};


gameModule.displayBoard();
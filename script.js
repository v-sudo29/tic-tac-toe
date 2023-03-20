// Global module
const gameModule = (() => {
  const gameBoard = ["X", "O", "O", "X", "X", "O", "X", "X", "X"];
  return {gameBoard};
})();

// Players
const playerFactory = (name, marker) => {
  // code goes here
};

// FUNCTION: display game board
function displayBoard() {
  const boardContainer = document.querySelector('.gameboard-container');
  for (let i = 0; i < 9; i++) {
    const tile = document.createElement('div');
    tile.setAttribute('id', `${i}`);
    tile.setAttribute('class', "tile");
    boardContainer.appendChild(tile);
  }
}

displayBoard();
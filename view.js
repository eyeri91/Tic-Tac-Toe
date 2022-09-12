export const Display = (function (appContainer) {
  const appContainer = appContainer;

  function createElement(elementType, elementText = "") {
    const element = document.createElement(elementType);
    element.textContent = elementText;
    return element;
  }

  function createGridCells(gridBoard) {
    for (let i = 0; i < 9; i++) {
      const cell = createElement("div");
      cell.id = i;
      cell.className.add("grid-item");
      gridBoard.append(cell);
    }
  }

  function renderStartPage() {
    const gameTitle = createElement("h1", "Tic-Tac-Toe");
    appContainer.append(gameTitle);

    const selectPlayerParagraph = createElement("p", "Select the player!");
    appContainer.append(selectPlayerParagraph);

    const playerButtonsContainer = createElement("div");
    appContainer.append(playerButtonsContainer);

    const player1Button = createElement("button", "X");
    playerButtonsContainer.append(player1Button);

    const player2Button = createElement("button", "O");
    playerButtonsContainer.append(player2Button);

    const startGameButton = createElement("button", "Start Game");
    appContainer.append(startGameButton);
  }

  function renderGamePage() {
    const resultDisplayContainer = createElement("div");
    appContainer.append(resultDisplayContainer);

    const mainGameDisplayContainer = createElement("div");
    appContainer.append(mainGameDisplayContainer);

    const player1Div = createElement("div", "X");
    mainGameDisplayContainer.append(player1Div);

    const gameBoardGrid = createElement("div");
    mainGameDisplayContainer.append(gameBoardGrid);

    createGridCells(gameBoardGrid);

    const player2Div = createElement("div", "O");
    mainGameDisplayContainer.append(player2Div);

    const replayGameButtonContainer = createElement("div");
    appContainer.append(replayGameButtonContainer);
  }

  function updateResults(gameResults) {
    // Target the replayGameButtonContainer and then append this button.
    // const replayGameButton = createElement("button", "Replay");
    // Target the resultDisplayContainer and then add the text
    // resultDisplayContainer.textContent = gameResults;
  }

  return { renderStartPage, renderGamePage, updateResults };
})(appContainer);

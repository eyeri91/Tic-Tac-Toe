export const Display = function (
  gameApp,
  publishGameStartEvent,
  publishAssignCellEvent
) {
  /**
   * const player1 = {
   * sign: X,
   * color: pink
   * assignedCell: [];
   * }; */
  // const player2 = {};
  const appContainer = gameApp;

  function createElement(elementType, elementText = "") {
    const element = document.createElement(elementType);
    element.textContent = elementText;
    return element;
  }

  function createGridCells(gridBoard) {
    for (let i = 0; i < 9; i++) {
      const cell = createElement("div");
      cell.id = i;
      cell.classList.add("grid-item");
      // Fill cells with temporary marks 'X'.
      cell.textContent = "X";
      cell.addEventListener(
        "click"
        // assign cell mark / change the color function;
      );
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
    player1Button.addEventListener("click", () => {
      startGameButton.disabled = false;
      toggleButtonClass(player1Button, player2Button);
    });

    const player2Button = createElement("button", "O");
    playerButtonsContainer.append(player2Button);
    player2Button.addEventListener("click", () => {
      startGameButton.disabled = false;
      toggleButtonClass(player2Button, player1Button);
    });

    const startGameButton = createElement("button", "Start Game");
    startGameButton.disabled = true;
    appContainer.append(startGameButton);
    startGameButton.addEventListener("click", () => {
      // Send data which charactor user chose to play
      const assignedMarksArray = returnAssignedMarks(
        player1Button,
        player2Button
      );
      publishGameStartEvent(assignedMarksArray);
    });
  }

  function toggleButtonClass(userMarkButton, computerMarkButton) {
    userMarkButton.className = "userMark";
    if (computerMarkButton.classList.contains("userMark")) {
      computerMarkButton.className.remove("userMark");
      computerMarkButton.className = "userMark";
    }
  }

  function returnAssignedMarks(player1Button, player2Button) {
    // Return an array of assgined marks.
    // Index 0 is always user.
    player1Button.classList.contains("userMarks")
      ? [player1Button.textContent, player2Button.textContent]
      : [player2Button.textContent, player1Button.textContent];
  }

  function renderGamePage() {
    const resultsDisplayContainer = createElement("div");
    resultsDisplayContainer.id = "results-container";
    appContainer.append(resultsDisplayContainer);

    const mainGameDisplayContainer = createElement("div");
    appContainer.append(mainGameDisplayContainer);

    const player1Div = createElement("div", "X");
    mainGameDisplayContainer.append(player1Div);

    const gameBoardGrid = createElement("div");
    gameBoardGrid.classList.add("grid-container");
    mainGameDisplayContainer.append(gameBoardGrid);

    createGridCells(gameBoardGrid);

    const player2Div = createElement("div", "O");
    mainGameDisplayContainer.append(player2Div);

    const replayGameButtonContainer = createElement("div");
    replayGameButtonContainer.id = "replay-container";
    appContainer.append(replayGameButtonContainer);
  }

  function changeCellColor(cellData) {
    //
  }

  function updateResults(gameResults) {
    const replayGameButtonContainer =
      document.getElementById("replay-container");

    const replayGameButton = createElement("button", "Replay");
    replayGameButtonContainer.append(replayGameButton);

    const resultsDisplayContainer =
      document.getElementById("results-container");
    resultsDisplayContainer.textContent = gameResults;
  }

  return { renderStartPage, renderGamePage, changeCellColor, updateResults };
};

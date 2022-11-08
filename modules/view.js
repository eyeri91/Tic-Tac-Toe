export const Display = function (
  gameApp,
  publishGameStartEvent,
  publishAssignCellEvent,
  publishPlayGameAgainEvent
) {
  const appContainer = gameApp;

  const classList = {
    borderRadius: "rounded-md",
  };

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
      // Fill cells with temporary marks '@'.
      cell.textContent = "@";
      cell.addEventListener("click", () => {
        publishAssignCellEvent(cell.id);
      });
      gridBoard.append(cell);
    }
  }

  function renderStartPage() {
    if (appContainer.hasChildNodes()) appContainer.replaceChildren();
    const gameTitle = createElement("h1", "Tic-Tac-Toe");
    gameTitle.classList.add(
      "text-5xl",
      "my-7",
      "px-3",
      "game-title",
      "rounded-md"
    );
    appContainer.append(gameTitle);

    const selectPlayerParagraph = createElement("p", "Select the player!");
    selectPlayerParagraph.classList.add("text-xl", "mt-4", "mb-1");
    appContainer.append(selectPlayerParagraph);

    const playerButtonsContainer = createElement("div");
    playerButtonsContainer.classList.add(
      "flex",
      "flex-row",
      "justify-between",
      "my-2"
    );
    appContainer.append(playerButtonsContainer);

    const player1Button = createElement("button", "X");
    player1Button.classList.add("bg-red-400");

    const player2Button = createElement("button", "O");
    player2Button.classList.add("bg-blue-400");

    const playerButtons = [player1Button, player2Button];

    for (const button of playerButtons) {
      button.classList.add("px-5", "mx-5", "text-8xl", "rounded-md");
      playerButtonsContainer.append(button);
      button.addEventListener("click", () => {
        startGameButton.disabled = false;
        if (button === player1Button) {
          toggleButtonClass(player1Button, player2Button);
        } else {
          toggleButtonClass(player2Button, player1Button);
        }
      });
    }

    const startGameButton = createElement("button", "Start Game");
    startGameButton.classList.add(
      "mb-6",
      "start-btn",
      "mt-4",
      "py-1",
      "px-2",
      "text-2xl",
      "rounded-md"
    );
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
      computerMarkButton.classList.remove("userMark");
    }
  }

  function returnAssignedMarks(player1Button, player2Button) {
    // Return an array of assgined marks.
    // Index 0 is always user.
    return player1Button.classList.contains("userMark")
      ? [player1Button.textContent, player2Button.textContent]
      : [player2Button.textContent, player1Button.textContent];
  }

  function renderGamePage() {
    if (appContainer.hasChildNodes()) appContainer.replaceChildren();
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

  function changeCellColorAndText(pickedCellObject) {
    const pickedCell = document.getElementById(pickedCellObject.id);
    pickedCell.textContent = pickedCellObject.mark;
    if (pickedCellObject.owner.name === "user") {
      pickedCell.classList.add("userMarkColor");
    } else {
      pickedCell.classList.add("compMarkColor");
    }
  }

  function updateResults(gameResults) {
    disableClickOnCells();
    const replayGameButtonContainer =
      document.getElementById("replay-container");

    const replayGameButton = createElement("button", "Replay");
    replayGameButtonContainer.append(replayGameButton);
    replayGameButton.addEventListener("click", publishPlayGameAgainEvent);

    const resultsDisplayContainer =
      document.getElementById("results-container");
    resultsDisplayContainer.textContent = `Winner : ${gameResults.winnerSign}`;
  }

  function disableClickOnCells() {
    const cells = document.getElementsByClassName("grid-item");
    for (const cell of cells) {
      cell.style.pointerEvents = "none";
    }
  }

  return {
    renderStartPage,
    renderGamePage,
    changeCellColorAndText,
    updateResults,
  };
};

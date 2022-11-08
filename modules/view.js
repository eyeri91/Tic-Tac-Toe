export const Display = function (
  gameApp,
  publishGameStartEvent,
  publishAssignCellEvent,
  publishPlayGameAgainEvent
) {
  const appContainer = gameApp;
  appContainer.classList.add(
    "container",
    "my-10",
    "flex",
    "h-4/6",
    "flex-col",
    "content-center",
    "items-center",
    "justify-center",
    "rounded-md"
  );

  function createElement(elementType, elementText = "") {
    const element = document.createElement(elementType);
    element.textContent = elementText;
    return element;
  }

  function createGridCells(gridBoard) {
    for (let i = 0; i < 9; i++) {
      const cell = createElement("div");
      cell.id = i;
      cell.classList.add(
        "grid-item",
        "flex",
        "justify-center",
        "content-center",
        "text-6xl",
        "p-2"
      );
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
      "text-8xl",
      "my-5",
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
      button.setAttribute("type", "button");
      button.classList.add(
        "px-5",
        "mx-5",
        "text-8xl",
        "rounded-md",
        "hover:-translate-y-1",
        "hover:ease-linear",
        "duration-150"
      );
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
      "rounded-md",
      "hover:-translate-y-1",
      "hover:ease-linear",
      "hover:bg-amber-400",
      "duration-100"
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
    mainGameDisplayContainer.classList.add(
      "flex",
      "flex-row",
      "content-center",
      "justify-center",
      "items-center"
    );
    appContainer.append(mainGameDisplayContainer);

    const player1Sign = createElement("div", "X");
    player1Sign.classList.add("bg-red-400", "mr-5");
    mainGameDisplayContainer.append(player1Sign);

    const gameBoardGrid = createElement("div");
    gameBoardGrid.id = "grid-container";
    gameBoardGrid.classList.add("my-10");
    mainGameDisplayContainer.append(gameBoardGrid);

    createGridCells(gameBoardGrid);

    const player2Sign = createElement("div", "O");
    player2Sign.classList.add("bg-blue-400", "ml-5");
    mainGameDisplayContainer.append(player2Sign);

    const playerSignContainers = [player1Sign, player2Sign];

    for (const playerSign of playerSignContainers) {
      playerSign.classList.add("h-3/6", "px-5", "text-8xl", "rounded-md");
    }

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
    const gridBoard = document.getElementById("grid-container");
    gridBoard.classList.remove("my-10");
    gridBoard.classList.add("my-4");
    disableClickOnCells();
    const replayGameButtonContainer =
      document.getElementById("replay-container");
    const replayGameButton = createElement("button", "Replay");
    replayGameButton.classList.add(
      "mb-3",
      "start-btn",
      "py-1",
      "px-3",
      "text-2xl",
      "rounded-md",
      "hover:-translate-y-1",
      "hover:ease-linear",
      "hover:bg-amber-400",
      "duration-100"
    );
    replayGameButtonContainer.append(replayGameButton);
    replayGameButton.addEventListener("click", publishPlayGameAgainEvent);

    const resultsDisplayContainer =
      document.getElementById("results-container");
    resultsDisplayContainer.classList.add(
      "text-5xl",
      "py-1",
      "px-2",
      "border-solid",
      "border-2",
      "mt-2"
    );
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

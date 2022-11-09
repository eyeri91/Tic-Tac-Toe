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

  function toggleButtonClass(userMarkButton, oponentMarkButton) {
    userMarkButton.className = "userMark";
    if (oponentMarkButton.classList.contains("userMark")) {
      oponentMarkButton.classList.remove("userMark");
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

    // The first item of the array of assigned marks is always a user.
    // And the second item is the mark for the oponent.
    const player1Sign = createElement("div", "X");
    player1Sign.id = "player1";
    player1Sign.classList.add("bg-red-400", "mr-5");
    mainGameDisplayContainer.append(player1Sign);

    const gameBoardGrid = createElement("div");
    gameBoardGrid.id = "grid-container";
    gameBoardGrid.classList.add("my-10", "grid-container");
    mainGameDisplayContainer.append(gameBoardGrid);

    createGridCells(gameBoardGrid);

    const player2Sign = createElement("div", "O");
    player2Sign.id = "player2";
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

  function changePickedCellColorAndText(pickedCellObject) {
    const pickedCell = document.getElementById(pickedCellObject.id);
    pickedCell.textContent = pickedCellObject.mark;
    if (pickedCellObject.owner.name === "user") {
      if (pickedCellObject.mark === "X") {
        pickedCell.classList.add("xMarkColor");
      } else {
        pickedCell.classList.add("oMarkColor");
      }
    } else if (pickedCellObject.owner.name === "oponent") {
      if (pickedCellObject.mark === "X") {
        pickedCell.classList.add("xMarkColor");
      } else {
        pickedCell.classList.add("oMarkColor");
      }
    }
  }

  function toggleActivePlayerColor(activePlayer) {
    const player1Sign = document.getElementById("player1");
    const player2Sign = document.getElementById("player2");
    if (activePlayer.sign === player1Sign.textContent) {
      player1Sign.classList.add("active-player");
      player2Sign.classList.remove("active-player");
    } else {
      player1Sign.classList.remove("active-player");
      player2Sign.classList.add("active-player");
    }
  }

  function updateResults(gameResults) {
    disableClickOnCells();

    const gridBoard = document.getElementById("grid-container");
    gridBoard.classList.remove("my-10");
    gridBoard.classList.add("my-4");

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
      "px-2",
      "mt-3",
      "rounded-md",
      "results-display"
    );

    if (gameResults.winnerSign === "X") {
      resultsDisplayContainer.classList.add("bg-red-400");
      resultsDisplayContainer.textContent = `Winner : ${gameResults.winnerSign}`;
      changeWinningLineBorderColor(gameResults.winningLine, "bg-red-400");
    } else if (gameResults.winnerSign === "O") {
      resultsDisplayContainer.classList.add("bg-blue-400");
      resultsDisplayContainer.textContent = `Winner : ${gameResults.winnerSign}`;
      changeWinningLineBorderColor(gameResults.winningLine, "bg-blue-400");
    } else {
      resultsDisplayContainer.classList.add("results-draw");
      resultsDisplayContainer.textContent = "DRAW!!!";
    }
  }

  function disableClickOnCells() {
    const cells = document.getElementsByClassName("grid-item");
    for (const cell of cells) {
      cell.style.pointerEvents = "none";
    }
  }

  function changeWinningLineBorderColor(winningLine) {
    for (let i = 0; i < winningLine.length; i++) {
      // document.getElementById(`${winningLine[i]}`).style.border = "none";
      document
        .getElementById(`${winningLine[i]}`)
        .classList.add("winning-line-border");
    }
  }

  return {
    renderStartPage,
    renderGamePage,
    changePickedCellColorAndText,
    updateResults,
    toggleActivePlayerColor,
  };
};

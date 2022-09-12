export const Display = (function (appContainer) {
  const appContainer = appContainer;

  function createElement(elementType, elementText = "") {
    const element = document.createElement(elementType);
    element.textContent = elementText;
    return element;
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
  //   renderGamePage()
  //renderResults()

  return { renderStartPage };
})(appContainer);

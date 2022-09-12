export const Display = (function (appContainer) {
  const appContainer = appContainer;

  function createElement(elementType, elementText = "") {
    const element = document.createElement(elementType);
    element.textContent = elementText;
    return element;
  }

  //   function renderStartPage() {}
  //   renderGamePage()
  //renderResults()
})(appContainer);

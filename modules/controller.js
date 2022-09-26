import { EvenetManager } from "./eventManager.js";
import { Display } from "./view.js";
import { GameBoard } from "./game.js";

export const Controller = function (root) {
  const view = Display(root);

  function init() {
    const model = GameBoard;
    view.renderStartPage();
  }

  return { init };
};

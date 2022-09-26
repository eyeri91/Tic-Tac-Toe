import { EventManager } from "./eventManager.js";
import { Display } from "./view.js";
import { GameBoard } from "./game.js";

export const Controller = function (root) {
  const view = Display(root);
  const eventManager = EventManager;

  function init() {
    const model = GameBoard;
    view.renderStartPage();
  }

  return { init };
};

/***
 * select the player
 * start game
 * assign cell
 * gameEnd
 *
 */

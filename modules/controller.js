import { EventManager } from "./eventManager.js";
import { Display } from "./view.js";
import { GameBoard } from "./game.js";

export const Controller = function (root) {
  const eventManager = EventManager;

  eventManager.subscribe(
    "gameStart",
    (data) => view.renderGamePage()
    // Send chosen player details to view.
  );

  eventManager.subscribe("assignCell", (data) => {
    model.assignCell(data);
    view.changeCellColor(data);
  });

  eventManager.subscribe("gameEnd", (data) => model.checkWinningLine(data));

  eventManager.subscribe("showResuts", (data) => view.updateResults(data));

  eventManager.publish("gameStart", data);
  eventManager.publish("gameEnd", data);

  const view = Display(root, (data) => eventManager.publish("gameStart"));
  const model = GameBoard;

  function init() {
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

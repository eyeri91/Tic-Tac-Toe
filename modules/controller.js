import { EventManager } from "./eventManager.js";
import { Display } from "./view.js";
import { GameBoard } from "./game.js";

export const Controller = function (root) {
  const eventManager = EventManager;

  eventManager.subscribe("gameStart", (data) => {
    view.renderGamePage(), model.assignPlayers(data);
  });

  eventManager.subscribe("assignCell", (data) => model.assignCell(data));

  eventManager.subscribe("cellAssigned", (data) =>
    view.changeCellColorAndText(data)
  );

  eventManager.subscribe("gameEnd", (data) => view.updateResults(data));

  const view = Display(
    root,
    (data) => eventManager.publish("gameStart", data),
    (data) => eventManager.publish("assignCell", data)
  );
  const model = GameBoard(
    (data) => eventManager.publish("cellAssigned", data),
    (data) => eventManager.publish("gameEnd", data)
  );

  function init() {
    view.renderStartPage();
  }

  return { init };
};

/***
 * select the player
 * start game
 * assign cell
 * cellAssigned (that passes the mark of the cell owner)
 * gameEnd
 *
 */

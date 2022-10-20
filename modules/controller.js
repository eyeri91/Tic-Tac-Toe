import { EventManager } from "./eventManager.js";
import { Display } from "./view.js";
import { GameBoard } from "./game.js";

export const Controller = function (root) {
  const eventManager = EventManager;

  eventManager.subscribe("gameStart", (data) => {
    view.renderGamePage(), model.assignPlayers(data);
  });

  eventManager.subscribe("assignCell", (data) => {
    model.assignCell(data);
    // Once cell is assigned -> change the color and textContent in View.
  });

  eventManager.subscribe("gameEnd", (data) => model.checkWinningLine(data));

  eventManager.subscribe("releaseResuts", (data) => view.updateResults(data));

  // eventManager.publish("gameStart", data);
  // eventManager.publish("gameEnd", data);

  const view = Display(
    root,
    (data) => eventManager.publish("gameStart", data),
    (data) => eventManager.publish("assignCell", data)
  );
  const model = GameBoard(
    (data) => eventManager.publish("gameEnd", data),
    (data) => eventManager.publish("releaseResults", data)
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
 * gameEnd
 *
 */

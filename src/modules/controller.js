import { EventManager } from "./eventManager.js";
import { Display } from "./view.js";
import { GameBoard } from "./game.js";

export const Controller = function (root) {
  const eventManager = EventManager;
  let model;

  eventManager.subscribe("gameStart", (data) => {
    view.renderGamePage(), model.assignPlayers(data);
  });

  eventManager.subscribe("announceActivePlayer", (data) => {
    view.toggleActivePlayerColor(data);
  });

  eventManager.subscribe("assignCell", (data) => model.assignCell(data));

  eventManager.subscribe("cellAssigned", (data) => {
    view.changePickedCellColorAndText(data);
  });

  eventManager.subscribe("toggleActivePlayer", (data) => {
    view.toggleActivePlayerColor(data);
  });

  eventManager.subscribe("gameEnd", (data) => {
    view.updateResults(data);
  });

  const view = Display(
    root,
    (data) => eventManager.publish("gameStart", data),
    (data) => eventManager.publish("assignCell", data),
    () => init()
  );

  function init() {
    view.renderStartPage();
    model = GameBoard(
      (data) => eventManager.publish("announceActivePlayer", data),
      (data) => eventManager.publish("cellAssigned", data),
      (data) => eventManager.publish("toggleActivePlayer", data),
      (data) => eventManager.publish("gameEnd", data)
    );
  }

  return { init };
};

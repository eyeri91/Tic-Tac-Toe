import { Display } from "./view.js";

import { GameBoard } from "./game.js";

export const Controller = (function (root) {
  const view = Display(root);
  const model = GameBoard;
})();

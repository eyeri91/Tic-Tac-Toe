import { Controller } from "../modules/controller.js";
const gameApp = document.getElementById("game-container");

const display = Controller(gameApp);

display.init();

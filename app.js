import { Controller } from "./modules/controller.js";
const gameApp = document.getElementById("gameContainer");

const display = Controller(gameApp);

display.init();

import "./input.css";
import { Controller } from "./controller.js";
const gameApp = document.getElementById("game-container");

const display = Controller(gameApp);

display.init();

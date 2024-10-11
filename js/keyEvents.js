import { state } from "./variables.js";

// Обработка нажатия Ctrl
export function handleKeyDown(e) {
  if (e.key === "Control") state.isCtrlPressed = true;
}

// Обработка отпускания Ctrl
export function handleKeyUp(e) {
  if (e.key === "Control") state.isCtrlPressed = false;
}

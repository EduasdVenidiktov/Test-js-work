import { state } from "./variables.js";

export function handleMouseUp() {
  if (state.isDragging) {
    state.isDragging = false;
    document.querySelector(".selection-box").style.display = "none";
  }
}

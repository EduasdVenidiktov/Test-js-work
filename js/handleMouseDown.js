import { state } from "./variables.js";

export function handleMouseDown(e) {
  if (e.target.closest(".letter")) return;
  state.isDragging = true;
  state.startX = e.pageX;
  state.startY = e.pageY;
  const selectionBox = document.querySelector(".selection-box");
  selectionBox.style.left = `${state.startX}px`;
  selectionBox.style.top = `${state.startY}px`;
  selectionBox.style.width = "0px";
  selectionBox.style.height = "0px";
  selectionBox.style.display = "block";
}

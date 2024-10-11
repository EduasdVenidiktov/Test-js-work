import { state } from "./variables.js";

export function handleMouseMove(e) {
  if (!state.isDragging) return;

  const selectionBox = document.querySelector(".selection-box");
  const { startX, startY } = state;
  const currentX = e.pageX;
  const currentY = e.pageY;

  const left = Math.min(startX, currentX);
  const top = Math.min(startY, currentY);
  const width = Math.abs(currentX - startX);
  const height = Math.abs(currentY - startY);

  selectionBox.style.left = `${left}px`;
  selectionBox.style.top = `${top}px`;
  selectionBox.style.width = `${width}px`;
  selectionBox.style.height = `${height}px`;

  const selectionRect = selectionBox.getBoundingClientRect();
  const selectedLetters = state.selectedLetters;

  document.querySelectorAll(".letter").forEach((letter) => {
    const letterRect = letter.getBoundingClientRect();
    const isInsideSelectionBox =
      selectionRect.left < letterRect.right &&
      selectionRect.right > letterRect.left &&
      selectionRect.top < letterRect.bottom &&
      selectionRect.bottom > letterRect.top;

    if (isInsideSelectionBox) {
      letter.classList.add("selected");
      if (!selectedLetters.includes(letter)) {
        selectedLetters.push(letter);
      }
    } else {
      letter.classList.remove("selected");
      state.selectedLetters = selectedLetters.filter((el) => el !== letter);
    }
  });
}

// selectionBoxHandler.js
import {
  getSelectedLetters,
  clearSelection,
  removeSelectedLetter,
} from "./letterSelectionHandler.js";

let isDragging = false;
let startX, startY;
const selectionBox = document.createElement("div");
selectionBox.className = "selection-box";
document.body.appendChild(selectionBox);

export function setupSelectionBox() {
  document.addEventListener("mousedown", (e) => {
    if (e.target.closest(".letter")) return;
    isDragging = true;
    startX = e.pageX;
    startY = e.pageY;
    selectionBox.style.left = `${startX}px`;
    selectionBox.style.top = `${startY}px`;
    selectionBox.style.width = "0px";
    selectionBox.style.height = "0px";
    selectionBox.style.display = "block";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const currentX = e.pageX;
    const currentY = e.pageY;

    selectionBox.style.left = `${Math.min(startX, currentX)}px`;
    selectionBox.style.top = `${Math.min(startY, currentY)}px`;
    selectionBox.style.width = `${Math.abs(currentX - startX)}px`;
    selectionBox.style.height = `${Math.abs(currentY - startY)}px`;

    const selectionRect = selectionBox.getBoundingClientRect();

    document.querySelectorAll(".letter").forEach((letter) => {
      const letterRect = letter.getBoundingClientRect();

      if (
        selectionRect.left < letterRect.right &&
        selectionRect.right > letterRect.left &&
        selectionRect.top < letterRect.bottom &&
        selectionRect.bottom > letterRect.top
      ) {
        letter.classList.add("selected");
        if (!getSelectedLetters().includes(letter))
          getSelectedLetters().push(letter);
      } else {
        letter.classList.remove("selected");
        removeSelectedLetter(letter);
      }
    });
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      selectionBox.style.display = "none";
    }
  });
}

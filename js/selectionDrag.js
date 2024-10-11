import { state } from "./variables.js";
import { createLetterElement, clearSelection } from "./letters.js";

// Выделение рамкой
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

export function handleMouseMove(e) {
  if (!state.isDragging) return;
  const currentX = e.pageX;
  const currentY = e.pageY;
  const selectionBox = document.querySelector(".selection-box");

  selectionBox.style.left = `${Math.min(state.startX, currentX)}px`;
  selectionBox.style.top = `${Math.min(state.startY, currentY)}px`;
  selectionBox.style.width = `${Math.abs(currentX - state.startX)}px`;
  selectionBox.style.height = `${Math.abs(currentY - state.startY)}px`;

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
      if (!state.selectedLetters.includes(letter)) {
        state.selectedLetters.push(letter);
      }
    } else {
      letter.classList.remove("selected");
      state.selectedLetters = state.selectedLetters.filter(
        (el) => el !== letter
      );
    }
  });
}

export function handleMouseUp() {
  if (state.isDragging) {
    state.isDragging = false;
    const selectionBox = document.querySelector(".selection-box");
    selectionBox.style.display = "none";
  }
}

export function handleDrop(e) {
  e.preventDefault();

  // Отримуємо дані з dataTransfer
  const letters = e.dataTransfer.getData("text/plain");
  const letterArray = JSON.parse(letters);

  // Знаходимо інший символ у місці drop
  const overlappingLetter = document
    .elementsFromPoint(e.clientX, e.clientY)
    .find((el) => el.classList.contains("letter"));

  // Якщо є символ у місці drop
  if (overlappingLetter) {
    const selectedIndices = state.selectedLetters.map((letter) =>
      letter.getAttribute("data-index")
    );

    // Міняємо текст та індекси
    selectedIndices.forEach((selectedIndex, index) => {
      const tempText = overlappingLetter.textContent;
      overlappingLetter.textContent = state.selectedLetters[index].textContent;
      state.selectedLetters[index].textContent = tempText;

      // Обновляємо data-index
      const tempIndex = overlappingLetter.getAttribute("data-index");
      overlappingLetter.setAttribute("data-index", selectedIndex);
      state.selectedLetters[index].setAttribute("data-index", tempIndex);
    });
  } else {
    // Якщо drop не на іншому символі, просто переносимо символи в нове місце
    letterArray.forEach((letter) => {
      const letterElement = createLetterElement(letter);
      letterElement.style.position = "absolute";
      letterElement.style.left = `${e.pageX}px`;
      letterElement.style.top = `${e.pageY}px`;

      // Додаємо символ на сторінку
      document.body.appendChild(letterElement);
    });

    // Видаляємо переміщені символи, якщо drop відбувається не на інший символ
    state.selectedLetters.forEach((letter) => letter.remove());
  }

  clearSelection(); // Скидаємо виділення після переміщення
}

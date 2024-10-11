import { state } from "./variables.js";
import { createLetterElement } from "./letters.js";

// Функция для обмена текстами и data-index
function swapLettersContentAndIndices(overlappingLetter) {
  const selectedIndices = state.selectedLetters.map((letter) =>
    letter.getAttribute("data-index")
  );

  selectedIndices.forEach((selectedIndex, index) => {
    const tempText = overlappingLetter.textContent;
    overlappingLetter.textContent = state.selectedLetters[index].textContent;
    state.selectedLetters[index].textContent = tempText;

    const tempIndex = overlappingLetter.getAttribute("data-index");
    overlappingLetter.setAttribute("data-index", selectedIndex);
    state.selectedLetters[index].setAttribute("data-index", tempIndex);
  });
}

// Функция для создания и размещения новых символов
function createAndPlaceLetters(letterArray, e) {
  letterArray.forEach((letter) => {
    const letterElement = createLetterElement(letter);
    letterElement.style.position = "absolute";
    letterElement.style.left = `${e.pageX}px`;
    letterElement.style.top = `${e.pageY}px`;

    document.body.appendChild(letterElement);
  });

  // Удаление перемещенных символов
  state.selectedLetters.forEach((letter) => letter.remove());
}

export function handleDrop(e) {
  e.preventDefault();
  const letters = e.dataTransfer.getData("text/plain");
  const letterArray = JSON.parse(letters);

  const overlappingLetter = document
    .elementsFromPoint(e.clientX, e.clientY)
    .find((el) => el.classList.contains("letter"));

  if (overlappingLetter) {
    swapLettersContentAndIndices(overlappingLetter);
  } else {
    createAndPlaceLetters(letterArray, e);
  }

  // Очистка выделения
  state.selectedLetters = [];
}

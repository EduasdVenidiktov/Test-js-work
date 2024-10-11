import { state } from "./variables.js";

// Функція створення елементу букви
export function createLetterElement(char, index) {
  const letterElement = document.createElement("span");
  letterElement.textContent = char;
  letterElement.classList.add("letter");
  letterElement.setAttribute("data-index", index);
  letterElement.setAttribute("draggable", "true");

  letterElement.addEventListener("click", () =>
    handleLetterClick(letterElement)
  );

  letterElement.addEventListener("dragstart", (e) => {
    // Якщо елемент не виділений, вибираємо його
    if (!state.selectedLetters.includes(letterElement)) {
      handleLetterClick(letterElement);
    }

    // Встановлюємо дані для перетягування
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify(state.selectedLetters.map((letter) => letter.textContent))
    );
    e.dataTransfer.effectAllowed = "move";
  });

  return letterElement;
}

// Обробка кліку по букві
export function handleLetterClick(letterElement) {
  if (letterElement.classList.contains("selected")) {
    letterElement.classList.remove("selected");
    state.selectedLetters = state.selectedLetters.filter(
      (el) => el !== letterElement
    );
  } else if (state.isCtrlPressed) {
    letterElement.classList.add("selected");
    state.selectedLetters.push(letterElement);
  } else {
    clearSelection();
    letterElement.classList.add("selected");
    state.selectedLetters.push(letterElement);
  }
}

// Функція очищення виділення
export function clearSelection() {
  state.selectedLetters.forEach((el) => el.classList.remove("selected"));
  state.selectedLetters = []; // Очищаємо масив виділених букв
}

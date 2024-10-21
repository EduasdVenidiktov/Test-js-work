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

// Функція обробки падіння елементів
export function handleDrop(e) {
  e.preventDefault();

  // Отримуємо дані з dataTransfer
  const letters = e.dataTransfer.getData("text/plain");
  const letterArray = JSON.parse(letters);

  // Знаходимо інший символ у місці drop
  const overlappingLetter = document
    .elementsFromPoint(e.clientX, e.clientY)
    .find((el) => el.classList.contains("letter"));

  if (overlappingLetter) {
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
  } else {
    // Якщо drop не на іншому символі, створюємо нові елементи
    letterArray.forEach((letter) => {
      const letterElement = createLetterElement(letter);
      letterElement.style.position = "absolute";
      letterElement.style.left = `${e.pageX}px`;
      letterElement.style.top = `${e.pageY}px`;

      document.body.appendChild(letterElement);
    });

    // Видаляємо старі елементи
    state.selectedLetters.forEach((letter) => letter.remove());
  }

  clearSelection(); // Скидаємо виділення після переміщення
}

// Функція обробки кліку по букві
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

// Додаємо обробник для drop події
document.addEventListener("drop", handleDrop);

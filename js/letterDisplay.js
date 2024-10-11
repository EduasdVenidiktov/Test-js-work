// letterDisplay.js

import { handleLetterClick } from "./selectionHandler.js";

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
    // Если элемент не выделен, выбираем его
    if (!selectedLetters.includes(letterElement)) {
      handleLetterClick(letterElement);
    }

    // Устанавливаем данные для перетаскивания
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify(selectedLetters.map((letter) => letter.textContent))
    );
    e.dataTransfer.effectAllowed = "move";
  });

  return letterElement;
}

export function displayText(inputText) {
  const outputDiv = document.getElementById("output");

  // Удаляем все буквы (span) с документа
  document.querySelectorAll(".letter").forEach((letter) => letter.remove());

  outputDiv.innerHTML = ""; // Очищаем перед добавлением новых букв

  inputText.split("").forEach((char, index) => {
    const letterElement = createLetterElement(char, index);
    outputDiv.appendChild(letterElement);
  });
}

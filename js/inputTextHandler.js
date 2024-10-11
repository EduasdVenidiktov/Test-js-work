// inputTextHandler.js
export function createLetterElement(letterText, index) {
  const letterElement = document.createElement("div");
  letterElement.textContent = letterText;
  letterElement.setAttribute("data-index", index);
  letterElement.classList.add("letter");
  letterElement.draggable = true; // Убедитесь, что элемент перетаскиваемый

  // Обработчик dragstart
  letterElement.addEventListener("dragstart", (e) => {
    const letterData = JSON.stringify([letterText, index]);
    e.dataTransfer.setData("text/plain", letterData);
    e.dataTransfer.effectAllowed = "move";
  });

  return letterElement;
}

export function renderLetters() {
  const lettersContainer = document.getElementById("lettersContainer"); // Контейнер для букв
  const letters = ["A", "B", "C", "D", "E"]; // Пример массива букв

  letters.forEach((letter, index) => {
    const letterElement = createLetterElement(letter, index);
    lettersContainer.appendChild(letterElement);
  });
}

// Вызовите функцию для рендеринга букв
renderLetters();

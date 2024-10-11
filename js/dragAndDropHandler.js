// dragAndDropHandler.js
import { getSelectedLetters, clearSelection } from "./letterDisplay.js";
import { createLetterElement } from "./inputTextHandler.js";

export function setupDragAndDrop() {
  document.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });

  document.addEventListener("drop", (e) => {
    e.preventDefault();

    const letters = e.dataTransfer.getData("text/plain");

    // Логируем данные, чтобы увидеть, что мы получаем
    console.log("Data received from drag:", letters);

    if (!letters) {
      console.error("No data received. Cannot parse JSON.");
      return; // Прекращаем выполнение, если данных нет
    }

    let letterArray = [];

    // Обработка JSON.parse с проверкой на ошибки
    try {
      letterArray = JSON.parse(letters);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return; // Прекращаем выполнение, если произошла ошибка
    }

    const overlappingLetter = document
      .elementsFromPoint(e.clientX, e.clientY)
      .find((el) => el.classList.contains("letter"));

    if (overlappingLetter) {
      const selectedLetters = getSelectedLetters(); // Получаем выбранные буквы
      const selectedIndices = selectedLetters.map((letter) =>
        letter.getAttribute("data-index")
      );

      // Переключение текста и индексов выбранных букв
      selectedIndices.forEach((selectedIndex, index) => {
        const tempText = overlappingLetter.textContent;
        overlappingLetter.textContent = selectedLetters[index].textContent;
        selectedLetters[index].textContent = tempText;

        const tempIndex = overlappingLetter.getAttribute("data-index");
        overlappingLetter.setAttribute("data-index", selectedIndex);
        selectedLetters[index].setAttribute("data-index", tempIndex);
      });
    } else {
      // Если не было перекрывающей буквы, создаём новые буквы
      letterArray.forEach((letter) => {
        const letterElement = createLetterElement(letter);
        letterElement.style.position = "absolute";
        letterElement.style.left = `${e.pageX}px`;
        letterElement.style.top = `${e.pageY}px`;

        document.body.appendChild(letterElement);
      });

      const selectedLetters = getSelectedLetters(); // Получаем выбранные буквы
      selectedLetters.forEach((letter) => letter.remove());
    }

    clearSelection();
  });
}

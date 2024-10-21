import { createSelectionBox } from "./js/selectionBox.js"; // Импортируем функцию создания selectionBox
import { handleDragOver } from "./js/dragAndDrop.js"; // Импортируем функцию обработки dragover
import { handleTextDisplay } from "./js/textDisplay.js"; // Импортируем функцию отображения текста
import { handleKeyDown, handleKeyUp } from "./js/keyEvents.js"; // Импортируем обработку нажатий клавиш
import { handleDrop } from "./js/handleDrop.js";
import { handleMouseMove } from "./js/handleMouseMove.js";
import { handleMouseDown } from "./js/handleMouseDown.js";
import { handleMouseUp } from "./js/handleMouseUp.js";

// Создаем и добавляем selectionBox
createSelectionBox();

// Слушаем нажатие Ctrl
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

document.getElementById("applyButton").addEventListener("click", function () {
  const inputField = document.getElementById("textInput");
  const inputValue = inputField.value.trim(); // Отримуємо значення поля і видаляємо зайві пробіли

  if (!inputValue) {
    showErrorNotification("Please enter some text!"); // Виводимо спливаюче повідомлення
  } else {
    handleTextDisplay(); // Викликаємо існуючу функцію для обробки введеного тексту
  }
});

// Общая логика для сброса на любое место на экране
document.addEventListener("dragover", handleDragOver);

document.addEventListener("drop", handleDrop);

// Выделение рамкой
document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);

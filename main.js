import { createSelectionBox } from "./js/selectionBox.js"; // Импортируем функцию создания selectionBox
import { handleDragOver } from "./js/dragAndDrop.js"; // Импортируем функцию обработки dragover
import { handleTextDisplay } from "./js/textDisplay.js"; // Импортируем функцию отображения текста
import { handleKeyDown, handleKeyUp } from "./js/keyEvents.js"; // Импортируем обработку нажатий клавиш
import { handleDrop } from "./js/handleDrop.js";
import { handleMouseMove } from "./js/handleMouseMove.js";
import { handleMouseDown } from "./js/handleMouseDown.js";
import { handleMouseUp } from "./js/handleMouseUp.js";

// import { showErrorNotification } from "./js/toastr-notifications.js";

// Создаем и добавляем selectionBox
createSelectionBox();

// Слушаем нажатие Ctrl
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

// Отображение текста
// document
//   .getElementById("applyButton")
//   .addEventListener("click", handleTextDisplay);
//================= 2 =================================================
document.getElementById("applyButton").addEventListener("click", function () {
  const inputField = document.getElementById("textInput");
  const inputValue = inputField.value.trim(); // Отримуємо значення поля і видаляємо зайві пробіли

  //   if (!inputValue) {
  //     alert("Please enter some text!"); // Виводимо спливаюче повідомлення
  //   } else {
  //     handleTextDisplay(); // Викликаємо існуючу функцію для обробки введеного тексту
  //   }
  // });

  if (!inputValue) {
    alert("Please enter some text!"); // Виводимо спливаюче повідомлення
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

//====================== 4 =================================

// import {
//   handleMouseDown,
//   handleMouseMove,
//   handleMouseUp,
//   handleDrop,
// } from "./js/selectionDrag.js"; // Импортируем функции выделения и перетаскивания
// import { handleTextDisplay } from "./js/textDisplay.js"; // Импортируем функцию отображения текста
// import { handleKeyDown, handleKeyUp } from "./js/keyEvents.js"; // Импортируем обработку нажатий клавиш

// const selectionBox = document.createElement("div");
// selectionBox.className = "selection-box";
// document.body.appendChild(selectionBox);

// // Слушаем нажатие Ctrl
// document.addEventListener("keydown", handleKeyDown);
// document.addEventListener("keyup", handleKeyUp);

// // Отображение текста
// document
//   .getElementById("applyButton")
//   .addEventListener("click", handleTextDisplay);

// // Общая логика для сброса на любое место на экране
// document.addEventListener("dragover", (e) => {
//   e.preventDefault();
//   e.dataTransfer.dropEffect = "move"; // Меняем курсор на перемещение
// });

// document.addEventListener("drop", handleDrop);

// // Выделение рамкой
// document.addEventListener("mousedown", handleMouseDown);
// document.addEventListener("mousemove", handleMouseMove);
// document.addEventListener("mouseup", handleMouseUp);

//================ 3 ===========================================

// import { state } from "./js/variables.js";
// import { createLetterElement } from "./js/letters.js";
// import {
//   handleMouseDown,
//   handleMouseMove,
//   handleMouseUp,
//   handleDrop,
// } from "./js/selectionDrag.js"; // Импортируем новые функции

// const selectionBox = document.createElement("div");
// selectionBox.className = "selection-box";
// document.body.appendChild(selectionBox);

// // Слушаем нажатие Ctrl
// document.addEventListener("keydown", (e) => {
//   if (e.key === "Control") state.isCtrlPressed = true;
// });

// document.addEventListener("keyup", (e) => {
//   if (e.key === "Control") state.isCtrlPressed = false;
// });

// // Отображение текста
// document.getElementById("applyButton").addEventListener("click", () => {
//   const outputDiv = document.getElementById("output");

//   // Удаляем все буквы (span) с документа
//   document.querySelectorAll(".letter").forEach((letter) => letter.remove());

//   const inputText = document.getElementById("textInput").value;
//   outputDiv.innerHTML = ""; // Очищаем перед добавлением новых букв

//   inputText.split("").forEach((char, index) => {
//     const letterElement = createLetterElement(char, index);
//     outputDiv.appendChild(letterElement);
//   });
// });

// // Общая логика для сброса на любое место на экране
// document.addEventListener("dragover", (e) => {
//   e.preventDefault();
//   e.dataTransfer.dropEffect = "move"; // Меняем курсор на перемещение
// });

// document.addEventListener("drop", handleDrop);

// // Выделение рамкой
// document.addEventListener("mousedown", handleMouseDown);
// document.addEventListener("mousemove", handleMouseMove);
// document.addEventListener("mouseup", handleMouseUp);

//====================== 2 ============================================
// import { state } from "./js/variables.js";
// import { createLetterElement, clearSelection } from "./js/letters.js"; // Импортируем функции

// const selectionBox = document.createElement("div");
// selectionBox.className = "selection-box";
// document.body.appendChild(selectionBox);

// // Слушаем нажатие Ctrl
// document.addEventListener("keydown", (e) => {
//   if (e.key === "Control") state.isCtrlPressed = true;
// });

// document.addEventListener("keyup", (e) => {
//   if (e.key === "Control") state.isCtrlPressed = false;
// });

// // Отображение текста
// document.getElementById("applyButton").addEventListener("click", () => {
//   const outputDiv = document.getElementById("output");

//   // Удаляем все буквы (span) с документа
//   document.querySelectorAll(".letter").forEach((letter) => letter.remove());

//   const inputText = document.getElementById("textInput").value;
//   outputDiv.innerHTML = ""; // Очищаем перед добавлением новых букв

//   inputText.split("").forEach((char, index) => {
//     const letterElement = createLetterElement(char, index);
//     outputDiv.appendChild(letterElement);
//   });
// });

// // Общая логика для сброса на любое место на экране
// document.addEventListener("dragover", (e) => {
//   e.preventDefault();
//   e.dataTransfer.dropEffect = "move"; // Меняем курсор на перемещение
// });

// document.addEventListener("drop", (e) => {
//   e.preventDefault();

//   // Отримуємо дані з dataTransfer
//   const letters = e.dataTransfer.getData("text/plain");
//   const letterArray = JSON.parse(letters);

//   // Знаходимо інший символ у місці drop
//   const overlappingLetter = document
//     .elementsFromPoint(e.clientX, e.clientY)
//     .find((el) => el.classList.contains("letter"));

//   // Якщо є символ у місці drop
//   if (overlappingLetter) {
//     const selectedIndices = state.selectedLetters.map((letter) =>
//       letter.getAttribute("data-index")
//     );

//     // Міняємо текст та індекси
//     selectedIndices.forEach((selectedIndex, index) => {
//       const tempText = overlappingLetter.textContent;
//       overlappingLetter.textContent = state.selectedLetters[index].textContent;
//       state.selectedLetters[index].textContent = tempText;

//       // Обновляємо data-index
//       const tempIndex = overlappingLetter.getAttribute("data-index");
//       overlappingLetter.setAttribute("data-index", selectedIndex);
//       state.selectedLetters[index].setAttribute("data-index", tempIndex);
//     });
//   } else {
//     // Якщо drop не на іншому символі, просто переносимо символи в нове місце
//     letterArray.forEach((letter) => {
//       const letterElement = createLetterElement(letter);
//       letterElement.style.position = "absolute";
//       letterElement.style.left = `${e.pageX}px`;
//       letterElement.style.top = `${e.pageY}px`;

//       // Додаємо символ на сторінку
//       document.body.appendChild(letterElement);
//     });

//     // Видаляємо переміщені символи, якщо drop відбувається не на інший символ
//     state.selectedLetters.forEach((letter) => letter.remove());
//   }

//   clearSelection(); // Скидаємо виділення після переміщення
// });

// // Выделение рамкой
// document.addEventListener("mousedown", (e) => {
//   if (e.target.closest(".letter")) return;
//   state.isDragging = true;
//   state.startX = e.pageX;
//   state.startY = e.pageY;
//   selectionBox.style.left = `${state.startX}px`;
//   selectionBox.style.top = `${state.startY}px`;
//   selectionBox.style.width = "0px";
//   selectionBox.style.height = "0px";
//   selectionBox.style.display = "block";
// });

// document.addEventListener("mousemove", (e) => {
//   if (!state.isDragging) return;

//   const currentX = e.pageX;
//   const currentY = e.pageY;

//   selectionBox.style.left = `${Math.min(state.startX, currentX)}px`;
//   selectionBox.style.top = `${Math.min(state.startY, currentY)}px`;
//   selectionBox.style.width = `${Math.abs(currentX - state.startX)}px`;
//   selectionBox.style.height = `${Math.abs(currentY - state.startY)}px`;

//   const selectionRect = selectionBox.getBoundingClientRect();

//   document.querySelectorAll(".letter").forEach((letter) => {
//     const letterRect = letter.getBoundingClientRect();

//     if (
//       selectionRect.left < letterRect.right &&
//       selectionRect.right > letterRect.left &&
//       selectionRect.top < letterRect.bottom &&
//       selectionRect.bottom > letterRect.top
//     ) {
//       letter.classList.add("selected");
//       if (!state.selectedLetters.includes(letter))
//         state.selectedLetters.push(letter);
//     } else {
//       letter.classList.remove("selected");
//       state.selectedLetters = state.selectedLetters.filter(
//         (el) => el !== letter
//       );
//     }
//   });
// });

// document.addEventListener("mouseup", () => {
//   if (state.isDragging) {
//     state.isDragging = false;
//     selectionBox.style.display = "none";
//   }
// });
//============ 1 =============================================================================
// import { state } from "./js/variables.js";

// const selectionBox = document.createElement("div");
// selectionBox.className = "selection-box";
// document.body.appendChild(selectionBox);

// // Слушаем нажатие Ctrl
// document.addEventListener("keydown", (e) => {
//   if (e.key === "Control") state.isCtrlPressed = true;
// });

// document.addEventListener("keyup", (e) => {
//   if (e.key === "Control") state.isCtrlPressed = false;
// });

// // Отображение текста
// document.getElementById("applyButton").addEventListener("click", () => {
//   const outputDiv = document.getElementById("output");

//   // Удаляем все буквы (span) с документа
//   document.querySelectorAll(".letter").forEach((letter) => letter.remove());

//   const inputText = document.getElementById("textInput").value;
//   outputDiv.innerHTML = ""; // Очищаем перед добавлением новых букв

//   inputText.split("").forEach((char, index) => {
//     const letterElement = createLetterElement(char, index);
//     outputDiv.appendChild(letterElement);
//   });
// });

// function createLetterElement(char, index) {
//   const letterElement = document.createElement("span");
//   letterElement.textContent = char;
//   letterElement.classList.add("letter");
//   letterElement.setAttribute("data-index", index);
//   letterElement.setAttribute("draggable", "true");

//   letterElement.addEventListener("click", () =>
//     handleLetterClick(letterElement)
//   );

//   letterElement.addEventListener("dragstart", (e) => {
//     // Если элемент не выделен, выбираем его
//     if (!state.selectedLetters.includes(letterElement)) {
//       handleLetterClick(letterElement);
//     }

//     // Устанавливаем данные для перетаскивания
//     e.dataTransfer.setData(
//       "text/plain",
//       JSON.stringify(state.selectedLetters.map((letter) => letter.textContent))
//     );
//     e.dataTransfer.effectAllowed = "move";
//   });

//   return letterElement;
// }

// function handleLetterClick(letterElement) {
//   if (letterElement.classList.contains("selected")) {
//     letterElement.classList.remove("selected");
//     state.selectedLetters = state.selectedLetters.filter(
//       (el) => el !== letterElement
//     );
//   } else if (state.isCtrlPressed) {
//     letterElement.classList.add("selected");
//     state.selectedLetters.push(letterElement);
//   } else {
//     clearSelection();
//     letterElement.classList.add("selected");
//     state.selectedLetters.push(letterElement);
//   }
// }

// function clearSelection() {
//   state.selectedLetters.forEach((el) => el.classList.remove("selected"));
//   state.selectedLetters = []; // Очищаем массив выделенных букв
// }

// // Общая логика для сброса на любое место на экране
// document.addEventListener("dragover", (e) => {
//   e.preventDefault();
//   e.dataTransfer.dropEffect = "move"; // Меняем курсор на перемещение
// });

// document.addEventListener("drop", (e) => {
//   e.preventDefault();

//   // Отримуємо дані з dataTransfer
//   const letters = e.dataTransfer.getData("text/plain");
//   const letterArray = JSON.parse(letters);

//   // Знаходимо інший символ у місці drop
//   const overlappingLetter = document
//     .elementsFromPoint(e.clientX, e.clientY)
//     .find((el) => el.classList.contains("letter"));

//   // Якщо є символ у місці drop
//   if (overlappingLetter) {
//     const selectedIndices = state.selectedLetters.map((letter) =>
//       letter.getAttribute("data-index")
//     );

//     // Міняємо текст та індекси
//     selectedIndices.forEach((selectedIndex, index) => {
//       const tempText = overlappingLetter.textContent;
//       overlappingLetter.textContent = state.selectedLetters[index].textContent;
//       state.selectedLetters[index].textContent = tempText;

//       // Обновляємо data-index
//       const tempIndex = overlappingLetter.getAttribute("data-index");
//       overlappingLetter.setAttribute("data-index", selectedIndex);
//       state.selectedLetters[index].setAttribute("data-index", tempIndex);
//     });
//   } else {
//     // Якщо drop не на іншому символі, просто переносимо символи в нове місце
//     letterArray.forEach((letter) => {
//       const letterElement = createLetterElement(letter);
//       letterElement.style.position = "absolute";
//       letterElement.style.left = `${e.pageX}px`;
//       letterElement.style.top = `${e.pageY}px`;

//       // Додаємо символ на сторінку
//       document.body.appendChild(letterElement);
//     });

//     // Видаляємо переміщені символи, якщо drop відбувається не на інший символ
//     state.selectedLetters.forEach((letter) => letter.remove());
//   }

//   clearSelection(); // Скидаємо виділення після переміщення
// });

// // Выделение рамкой
// document.addEventListener("mousedown", (e) => {
//   if (e.target.closest(".letter")) return;
//   state.isDragging = true;
//   state.startX = e.pageX;
//   state.startY = e.pageY;
//   selectionBox.style.left = `${state.startX}px`;
//   selectionBox.style.top = `${state.startY}px`;
//   selectionBox.style.width = "0px";
//   selectionBox.style.height = "0px";
//   selectionBox.style.display = "block";
// });

// document.addEventListener("mousemove", (e) => {
//   if (!state.isDragging) return;

//   const currentX = e.pageX;
//   const currentY = e.pageY;

//   selectionBox.style.left = `${Math.min(state.startX, currentX)}px`;
//   selectionBox.style.top = `${Math.min(state.startY, currentY)}px`;
//   selectionBox.style.width = `${Math.abs(currentX - state.startX)}px`;
//   selectionBox.style.height = `${Math.abs(currentY - state.startY)}px`;

//   const selectionRect = selectionBox.getBoundingClientRect();

//   document.querySelectorAll(".letter").forEach((letter) => {
//     const letterRect = letter.getBoundingClientRect();

//     if (
//       selectionRect.left < letterRect.right &&
//       selectionRect.right > letterRect.left &&
//       selectionRect.top < letterRect.bottom &&
//       selectionRect.bottom > letterRect.top
//     ) {
//       letter.classList.add("selected");
//       if (!state.selectedLetters.includes(letter))
//         state.selectedLetters.push(letter);
//     } else {
//       letter.classList.remove("selected");
//       state.selectedLetters = state.selectedLetters.filter(
//         (el) => el !== letter
//       );
//     }
//   });
// });

// document.addEventListener("mouseup", () => {
//   if (state.isDragging) {
//     state.isDragging = false;
//     selectionBox.style.display = "none";
//   }
// });

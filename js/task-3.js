let selectedLetters = [];
let isCtrlPressed = false;
let isDragging = false;
let startX, startY;
const selectionBox = document.createElement("div");
selectionBox.className = "selection-box";
document.body.appendChild(selectionBox); // Додаємо selectionBox до тіла документа

// Слухачі для клавіші Ctrl
document.addEventListener("keydown", (e) => {
  if (e.key === "Control") isCtrlPressed = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Control") isCtrlPressed = false;
});

// Відображення введеного тексту
document.getElementById("applyButton").addEventListener("click", () => {
  const inputText = document.getElementById("textInput").value;
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = ""; // Очищення попереднього тексту

  inputText.split("").forEach((char, index) => {
    const letterElement = document.createElement("span");
    letterElement.textContent = char;
    letterElement.classList.add("letter");
    letterElement.setAttribute("data-index", index);

    // Додавання слухача для кліка на букві
    letterElement.addEventListener("click", () =>
      handleLetterClick(letterElement)
    );

    // Додати слухач для перетягування
    letterElement.setAttribute("draggable", "true");
    letterElement.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", letterElement.textContent);
      e.dataTransfer.effectAllowed = "move";
      handleLetterClick(letterElement); // Вибір букви перед перетягуванням
    });

    outputDiv.appendChild(letterElement);
  });
});

// Функція для обробки кліку на букві
function handleLetterClick(letterElement) {
  if (letterElement.classList.contains("selected")) {
    letterElement.classList.remove("selected");
    selectedLetters = selectedLetters.filter((el) => el !== letterElement);
  } else if (isCtrlPressed) {
    letterElement.classList.add("selected");
    selectedLetters.push(letterElement);
  } else {
    clearSelection();
    letterElement.classList.add("selected");
    selectedLetters.push(letterElement);
  }
}

// Очистка вибору
function clearSelection() {
  document
    .querySelectorAll(".letter.selected")
    .forEach((el) => el.classList.remove("selected"));
  selectedLetters = [];
}

// Додавання слухача на область скидання
const dropArea = document.getElementById("dropArea");

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault(); // Дозволити скидання
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();

  // Перемістити одну букву
  const droppedLetter = e.dataTransfer.getData("text/plain");
  if (droppedLetter) {
    const letterElement = document.createElement("span");
    letterElement.textContent = droppedLetter;
    letterElement.classList.add("letter");
    dropArea.appendChild(letterElement);
  }

  // Перемістити всі виділені букви
  if (selectedLetters.length > 0) {
    selectedLetters.forEach((selectedLetter) => {
      const letterText = selectedLetter.textContent;
      const letterElement = document.createElement("span");
      letterElement.textContent = letterText;
      letterElement.classList.add("letter");
      dropArea.appendChild(letterElement);
    });

    // Очистити вибір після переміщення
    clearSelection();
  }
});

// Виділення букв рамкою
document.addEventListener("mousedown", (e) => {
  if (e.target.closest(".letter")) return; // Ігноруємо клік по буквах
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
      if (!selectedLetters.includes(letter)) selectedLetters.push(letter);
    } else {
      letter.classList.remove("selected");
      selectedLetters = selectedLetters.filter((el) => el !== letter);
    }
  });
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  selectionBox.style.display = "none";
});
//=====================================================
// let selectedLetters = [];
// let isDragging = false;
// let offsetX, offsetY;
// const selectionBox = document.createElement("div");
// selectionBox.className = "selection-box";
// document.body.appendChild(selectionBox); // Додаємо selectionBox до тіла документа

// // Відображення введеного тексту
// document.getElementById("applyButton").addEventListener("click", () => {
//   const inputText = document.getElementById("textInput").value;
//   const outputDiv = document.getElementById("output");
//   outputDiv.innerHTML = ""; // Очищення попереднього тексту

//   inputText.split("").forEach((char, index) => {
//     const letterElement = document.createElement("span");
//     letterElement.textContent = char;
//     letterElement.classList.add("letter");
//     letterElement.setAttribute("data-index", index);

//     // Додавання слухача для кліка на букві
//     letterElement.addEventListener("click", (e) =>
//       handleLetterClick(e, letterElement)
//     );

//     outputDiv.appendChild(letterElement);
//   });
// });

// // Функція для обробки кліку на букві
// function handleLetterClick(e, letterElement) {
//   e.stopPropagation(); // Зупинити події вгору по дереву
//   if (letterElement.classList.contains("selected")) {
//     letterElement.classList.remove("selected");
//     selectedLetters = selectedLetters.filter((el) => el !== letterElement);
//   } else {
//     letterElement.classList.add("selected");
//     selectedLetters.push(letterElement);
//   }
// }

// // Додавання слухача на область скидання
// const dropArea = document.getElementById("dropArea");

// dropArea.addEventListener("dragover", (e) => {
//   e.preventDefault(); // Дозволити скидання
// });

// dropArea.addEventListener("drop", (e) => {
//   e.preventDefault();
// });

// // Обробка переміщення літер
// document.addEventListener("mousedown", (e) => {
//   if (!selectedLetters.length) return; // Якщо немає виділених букв, вихід
//   isDragging = true;

//   const firstSelectedLetter = selectedLetters[0];
//   const rect = firstSelectedLetter.getBoundingClientRect();

//   // Визначити відстань від курсора до верхнього лівого кута букви
//   offsetX = e.clientX - rect.left;
//   offsetY = e.clientY - rect.top;

//   // Перетворюємо букви в draggable
//   selectedLetters.forEach((letter) => {
//     letter.setAttribute("draggable", "true");
//   });
// });

// // Переміщення букв
// document.addEventListener("mousemove", (e) => {
//   if (!isDragging) return;

//   selectedLetters.forEach((letter) => {
//     letter.style.position = "absolute";
//     letter.style.left = `${e.clientX - offsetX}px`;
//     letter.style.top = `${e.clientY - offsetY}px`;
//   });
// });

// // Завершення перетягування
// document.addEventListener("mouseup", (e) => {
//   if (!isDragging) return;
//   isDragging = false;

//   selectedLetters.forEach((letter) => {
//     const dropAreaRect = dropArea.getBoundingClientRect();
//     const letterRect = letter.getBoundingClientRect();

//     // Перевірка, чи скинули букву в область скидання
//     if (
//       letterRect.left >= dropAreaRect.left &&
//       letterRect.right <= dropAreaRect.right &&
//       letterRect.top >= dropAreaRect.top &&
//       letterRect.bottom <= dropAreaRect.bottom
//     ) {
//       // Перемістити букву у область скидання
//       dropArea.appendChild(letter);
//     } else {
//       // Якщо буква вийшла за межі області скидання, повертаємо її на попереднє місце
//       letter.style.position = "";
//     }
//   });

//   // Очистити вибір
//   clearSelection();
// });

// // Очистка вибору
// function clearSelection() {
//   document
//     .querySelectorAll(".letter.selected")
//     .forEach((el) => el.classList.remove("selected"));
//   selectedLetters = [];
// }

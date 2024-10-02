let selectedLetters = [];
let isDragging = false;
let offsetX, offsetY;
const selectionBox = document.createElement("div");
selectionBox.className = "selection-box";
document.body.appendChild(selectionBox); // Додаємо selectionBox до тіла документа

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
    letterElement.addEventListener("click", (e) =>
      handleLetterClick(e, letterElement)
    );

    outputDiv.appendChild(letterElement);
  });
});

// Функція для обробки кліку на букві
function handleLetterClick(e, letterElement) {
  e.stopPropagation(); // Зупинити події вгору по дереву
  if (letterElement.classList.contains("selected")) {
    letterElement.classList.remove("selected");
    selectedLetters = selectedLetters.filter((el) => el !== letterElement);
  } else {
    letterElement.classList.add("selected");
    selectedLetters.push(letterElement);
  }
}

// Додавання слухача на область скидання
const dropArea = document.getElementById("dropArea");

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault(); // Дозволити скидання
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
});

// Обробка переміщення літер
document.addEventListener("mousedown", (e) => {
  if (!selectedLetters.length) return; // Якщо немає виділених букв, вихід
  isDragging = true;

  const firstSelectedLetter = selectedLetters[0];
  const rect = firstSelectedLetter.getBoundingClientRect();

  // Визначити відстань від курсора до верхнього лівого кута букви
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  // Перетворюємо букви в draggable
  selectedLetters.forEach((letter) => {
    letter.setAttribute("draggable", "true");
  });
});

// Переміщення букв
document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  selectedLetters.forEach((letter) => {
    letter.style.position = "absolute";
    letter.style.left = `${e.clientX - offsetX}px`;
    letter.style.top = `${e.clientY - offsetY}px`;
  });
});

// Завершення перетягування
document.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  isDragging = false;

  selectedLetters.forEach((letter) => {
    const dropAreaRect = dropArea.getBoundingClientRect();
    const letterRect = letter.getBoundingClientRect();

    // Перевірка, чи скинули букву в область скидання
    if (
      letterRect.left >= dropAreaRect.left &&
      letterRect.right <= dropAreaRect.right &&
      letterRect.top >= dropAreaRect.top &&
      letterRect.bottom <= dropAreaRect.bottom
    ) {
      // Перемістити букву у область скидання
      dropArea.appendChild(letter);
    } else {
      // Якщо буква вийшла за межі області скидання, повертаємо її на попереднє місце
      letter.style.position = "";
    }
  });

  // Очистити вибір
  clearSelection();
});

// Очистка вибору
function clearSelection() {
  document
    .querySelectorAll(".letter.selected")
    .forEach((el) => el.classList.remove("selected"));
  selectedLetters = [];
}

let selectedLetters = [];
let isCtrlPressed = false;
let isDragging = false;
let startX, startY;
const selectionBox = document.createElement("div");
selectionBox.className = "selection-box";
document.body.appendChild(selectionBox);

// Слушаем нажатие Ctrl
document.addEventListener("keydown", (e) => {
  if (e.key === "Control") isCtrlPressed = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Control") isCtrlPressed = false;
});

// Отображение текста
document.getElementById("applyButton").addEventListener("click", () => {
  const inputText = document.getElementById("textInput").value;
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = ""; // Очищаем перед добавлением новых букв

  inputText.split("").forEach((char, index) => {
    const letterElement = createLetterElement(char, index);
    outputDiv.appendChild(letterElement);
  });
});

function createLetterElement(char, index) {
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

function clearSelection() {
  selectedLetters.forEach((el) => el.classList.remove("selected"));
  selectedLetters = []; // Очищаем массив выделенных букв
}

// Общая логика для сброса на любое место на экране
document.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move"; // Меняем курсор на перемещение
});

document.addEventListener("drop", (e) => {
  e.preventDefault();

  // Получаем данные из dataTransfer
  const letters = e.dataTransfer.getData("text/plain");
  const letterArray = JSON.parse(letters);

  // Определяем целевую позицию для сброса
  const overlappingLetter = document
    .elementsFromPoint(e.clientX, e.clientY)
    .find((el) => el.classList.contains("letter"));

  // Проверяем, находится ли сброс внутри outputDiv
  const outputDiv = document.getElementById("output");
  const isInsideOutputDiv = outputDiv.contains(e.target);

  if (overlappingLetter && isInsideOutputDiv) {
    // Если есть буква в месте сброса
    const overlappingIndex = Number(
      overlappingLetter.getAttribute("data-index")
    );

    // Получаем индексы для перемещения
    const selectedIndices = selectedLetters
      .map((letter) => Number(letter.getAttribute("data-index")))
      .sort((a, b) => a - b);

    // Обновляем массив букв в соответствии с порядком
    let newOrder = [...outputDiv.children].map((child) => child.textContent);
    const selectedLettersText = selectedLetters.map(
      (letter) => letter.textContent
    );

    // Удаляем выбранные буквы из нового порядка
    selectedLettersText.forEach((text) => {
      const index = newOrder.indexOf(text);
      if (index > -1) newOrder.splice(index, 1);
    });

    // Вставляем выбранные буквы в новое место
    const targetIndex = overlappingIndex; // Позиция, куда вставляем выбранные буквы
    newOrder.splice(targetIndex, 0, ...selectedLettersText);

    // Обновляем outputDiv с новым порядком
    outputDiv.innerHTML = "";
    newOrder.forEach((text, index) => {
      const letterElement = createLetterElement(text, index);
      outputDiv.appendChild(letterElement);
    });
  } else if (!isInsideOutputDiv) {
    // Если сброс вне outputDiv, добавляем буквы по координатам сброса
    const spacing = 20; // Устанавливаем расстояние между буквами
    let currentX = e.pageX; // Начальная позиция X

    letterArray.forEach((letter, index) => {
      const letterElement = createLetterElement(letter);
      letterElement.style.position = "absolute";
      letterElement.style.left = `${currentX}px`;
      letterElement.style.top = `${e.pageY}px`;

      // Добавляем букву на страницу
      document.body.appendChild(letterElement);

      // Обновляем текущую позицию для следующей буквы
      currentX += spacing; // Увеличиваем позицию X на расстояние
    });

    // Удаляем выделенные буквы, если они не внутри outputDiv
    selectedLetters.forEach((letter) => letter.remove());
  }

  clearSelection(); // Сбрасываем выделение после перемещения
});

// Выделение рамкой
document.addEventListener("mousedown", (e) => {
  if (e.target.closest(".letter")) return;
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
  if (isDragging) {
    isDragging = false;
    selectionBox.style.display = "none";
  }
});

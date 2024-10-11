import { createLetterElement } from "./letters.js";

// Функция для отображения текста
export function handleTextDisplay() {
  const outputDiv = document.getElementById("output");

  // Удаляем все буквы (span) с документа
  document.querySelectorAll(".letter").forEach((letter) => letter.remove());

  const inputText = document.getElementById("textInput").value;
  outputDiv.innerHTML = ""; // Очищаем перед добавлением новых букв

  inputText.split("").forEach((char, index) => {
    const letterElement = createLetterElement(char, index);
    outputDiv.appendChild(letterElement);
  });
}

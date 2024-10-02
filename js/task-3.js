"use strict";

// const elInput = document.getElementById("name-input");
// const elOutput = document.getElementById("name-output");

// elInput.addEventListener("input", () => {
//   const elTrim = elInput.value.trim();

//   elOutput.textContent = elTrim !== "" ? elTrim : "Anonymous";
// });
//===================================================================================================

// const elInput = document.getElementById("name-input");
// const elOutput = document.getElementById("name-output");

// elInput.addEventListener("input", () => {
//   const eltrim = elInput.value.trim();

//   elOutput.textContent = eltrim !== "" ? eltrim : "";
// });

//========================================================================================================

let isCtrlPressed = false;
let selectedLetters = [];

// Track the Ctrl key state
document.addEventListener("keydown", (e) => {
  if (e.key === "Control") isCtrlPressed = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Control") isCtrlPressed = false;
});

// Apply the input text to the output div
document.getElementById("applyButton").addEventListener("click", () => {
  const inputText = document.getElementById("textInput").value;
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = ""; // Clear previous content

  inputText.split("").forEach((char) => {
    const letterElement = document.createElement("span");
    letterElement.textContent = char;
    letterElement.classList.add("letter");
    letterElement.setAttribute("draggable", true);

    // Add event listeners for letter interaction
    letterElement.addEventListener("click", () =>
      handleLetterClick(letterElement)
    );
    letterElement.addEventListener("dragstart", handleDragStart);
    letterElement.addEventListener("dragover", (e) => e.preventDefault());
    letterElement.addEventListener("drop", (e) => handleDrop(e, letterElement));

    outputDiv.appendChild(letterElement);
  });
});

// Function to handle letter click with or without Ctrl
function handleLetterClick(letterElement) {
  if (letterElement.classList.contains("selected")) {
    letterElement.classList.remove("selected"); // Unselect on second click
    selectedLetters = selectedLetters.filter(
      (letter) => letter !== letterElement
    );
  } else if (isCtrlPressed) {
    letterElement.classList.add("selected"); // Select multiple with Ctrl
    selectedLetters.push(letterElement);
  } else {
    clearSelection(); // Clear previous selection if Ctrl is not pressed
    letterElement.classList.add("selected"); // Select the clicked letter
    selectedLetters = [letterElement];
  }
}

// Clear all selections
function clearSelection() {
  document
    .querySelectorAll(".selected")
    .forEach((el) => el.classList.remove("selected"));
  selectedLetters = [];
}

// Handle drag start
function handleDragStart(e) {
  if (selectedLetters.length === 0) {
    selectedLetters = [e.target]; // If nothing is selected, treat the dragged letter as the only selected letter
  }

  // Collect the text of all selected letters and store in drag data
  const draggedText = selectedLetters
    .map((letter) => letter.textContent)
    .join("");
  e.dataTransfer.setData("text/plain", draggedText);
}

// Handle drop event
function handleDrop(e, targetElement) {
  e.preventDefault();

  const draggedText = e.dataTransfer.getData("text/plain");

  // Remove all selected letters from their current positions
  selectedLetters.forEach((letter) => letter.remove());

  // Insert dragged letters at the drop position
  const outputDiv = document.getElementById("output");
  const targetIndex = Array.from(targetElement.parentNode.children).indexOf(
    targetElement
  );

  draggedText.split("").forEach((char, index) => {
    const letterElement = document.createElement("span");
    letterElement.textContent = char;
    letterElement.classList.add("letter");
    letterElement.setAttribute("draggable", true);
    letterElement.id = `letter-${index}`;
    letterElement.addEventListener("click", () =>
      handleLetterClick(letterElement)
    );

    letterElement.addEventListener("dragstart", handleDragStart);
    letterElement.addEventListener("dragover", (e) => e.preventDefault());
    letterElement.addEventListener("drop", (e) => handleDrop(e, letterElement));

    // Insert the letter at the correct position
    if (targetIndex < outputDiv.children.length) {
      outputDiv.insertBefore(letterElement, outputDiv.children[targetIndex]);
    } else {
      outputDiv.appendChild(letterElement);
    }
  });

  // Clear selection after drop
  clearSelection();
}

// Handle dropping outside specific elements (on the whole drop area)
const dropArea = document.getElementById("dropArea");
dropArea.addEventListener("dragover", (e) => e.preventDefault());
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  const draggedText = e.dataTransfer.getData("text/plain");

  // Remove all selected letters from their current positions
  selectedLetters.forEach((letter) => letter.remove());

  // Append each character of draggedText as a separate span
  draggedText.split("").forEach((char, index) => {
    const letterElement = document.createElement("span");
    letterElement.textContent = char;
    letterElement.classList.add("letter");
    letterElement.setAttribute("draggable", true);

    // Add event listeners for drag & click interactions
    letterElement.addEventListener("click", () =>
      handleLetterClick(letterElement)
    );
    letterElement.addEventListener("dragstart", handleDragStart);
    letterElement.addEventListener("dragover", (e) => e.preventDefault());
    letterElement.addEventListener("drop", (e) => handleDrop(e, letterElement));

    dropArea.appendChild(letterElement); // Add to drop area
  });

  // Clear selection after drop
  clearSelection();
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
}

const addBoxes = document.getElementById("boxes");
const inputValue = document.querySelector("input");
const btnCreate = document.querySelector("button[data-create]");
const btnDestroy = document.querySelector("button[data-destroy]");

btnCreate.addEventListener("click", createBox);
btnDestroy.addEventListener("click", destroyBox);

let size = 30;

function createBox() {
  const amount = inputValue.value;
  if (amount >= 1 && amount <= 100) {
    destroyBox();

    for (let i = 0; i < amount; i++) {
      const newBox = document.createElement("div");
      const boxSize = 30 + i * 10; // Обчислюємо розмір на основі індексу
      newBox.style.width = `${boxSize}px`;
      newBox.style.height = `${boxSize}px`;
      newBox.style.backgroundColor = getRandomHexColor();
      addBoxes.appendChild(newBox);
    }
    inputValue.value = "";
  }
}

function destroyBox() {
  addBoxes.textContent = "";
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const bodyElement = document.body;
const bodyColor = document.querySelector(".color");
const changeColorButton = document.querySelector(".change-color");

changeColorButton.addEventListener("click", () => {
  const changeColor = getRandomHexColor();

  bodyElement.style.backgroundColor = changeColor;
  bodyColor.textContent = changeColor;
  bodyColor.style.color = changeColor;
});

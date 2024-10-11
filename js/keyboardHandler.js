export let isCtrlPressed = false;

// Слушаем нажатие Ctrl
export function setupKeyboardListeners() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Control") isCtrlPressed = true;
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "Control") isCtrlPressed = false;
  });
}

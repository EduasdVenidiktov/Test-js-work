export function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move"; // Меняем курсор на перемещение
}

// import toastr from "toastr";
// import "../node_modules/toastr/build/toastr.min.css";

// export function showErrorNotification(message) {
//   toastr.options = {
//     positionClass: "toast-top-center",
//     closeButton: true, // Кнопка закрытия
//     debug: false,
//     newestOnTop: false,
//     progressBar: true,
//     preventDuplicates: true,
//     timeOut: "3000", // Уведомление будет отображаться 5 секунд
//   };
//   toastr.error(message);
// }

// import { Notyf } from "notyf"; // Если используете NPM
// или подключите через CDN, как указано выше.

// const notyf = new Notyf({
//   duration: 3000, // Продолжительность уведомления (3 секунды)
//   position: {
//     x: "center", // Позиция по горизонтали
//     y: "top", // Позиция по вертикали
//   },
//   dismissible: true, // Возможность закрыть уведомление вручную
// });

// export function showErrorNotification(message) {
//   notyf.error(message); // Показываем уведомление с ошибкой
// }

import { Notyf } from "notyf"; // Экспортируем Notyf из библиотеки

export function showErrorNotification(message) {
  const notyf = new Notyf({
    duration: 3000, // продолжительность показа
    position: { x: "center", y: "top" }, // Позиция по центру сверху
    dismissible: true, // Возможность закрыть уведомление
    backgroundColor: "indianred", // Цвет фона для ошибки
    color: "#fff", // Белый цвет текста
    ripple: true, // Эффект волн при клике
    icon: {
      className: "material-icons", // Можно указать класс для иконки
      tagName: "i", // Используем <i> тег для иконки
      text: "warning", // Текст иконки
      color: "#fff", // Цвет иконки
    },
  });

  notyf.error(message); // Показать сообщение об ошибке
}

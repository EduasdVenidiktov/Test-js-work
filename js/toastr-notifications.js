import toastr from "toastr";
import "toastr/build/toastr.min.css";

export function showErrorNotification(message) {
  toastr.options = {
    positionClass: "toast-top-center", // Уведомления будут отображаться по центру вверху
    closeButton: true, // Кнопка закрытия
    debug: false,
    newestOnTop: false,
    progressBar: true,
    preventDuplicates: true,
    timeOut: "3000", // Уведомление будет отображаться 5 секунд
  };
  toastr.error(message);
}

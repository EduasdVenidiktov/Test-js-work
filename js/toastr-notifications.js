import toastr from "toastr";
import "../node_modules/toastr/build/toastr.min.css";

export function showErrorNotification(message) {
  toastr.options = {
    positionClass: "toast-top-center",
    closeButton: true, // Кнопка закрытия
    debug: false,
    newestOnTop: false,
    progressBar: true,
    preventDuplicates: true,
    timeOut: "3000", // Уведомление будет отображаться 5 секунд
  };
  toastr.error(message);
}

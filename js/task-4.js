"use strict";

const registerForm = document.querySelector(".login-form");

registerForm.addEventListener("submit", handleSubmit);

function handleSubmit(ev) {
  ev.preventDefault();
  const form = ev.target;
  const email = form.elements.email.value.trim();
  const password = form.elements.password.value.trim();

  if (!email || !password) {
    return alert("All form fields must be filled in");
  }

  console.log(`Email: ${email}, Password: ${password}`);
  form.reset();
}

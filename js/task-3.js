"use strict";

const elInput = document.getElementById("name-input");
const elOutput = document.getElementById("name-output");

elInput.addEventListener("input", () => {
  const elTrim = elInput.value.trim();

  elOutput.textContent = elTrim !== "" ? elTrim : "Anonymous";
});

"use strict";

const numItem = document.querySelectorAll("li.item");
console.log("Number of categories:", numItem.length);

numItem.forEach((item) => {
  const category = item.querySelector("h2");
  console.log(`Categories: ${category.textContent}`);

  const numEl = item.querySelectorAll("ul>li");
  console.log(`Elements: ${numEl.length}`);
});

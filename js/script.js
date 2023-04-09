// Main javascript file.

// responsive navbar javascript part
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

//// ********Slide-bar-Js *********

const ImgArray = document.querySelectorAll(".img");

const rightBtn = document.getElementById("btn-right");

const leftBtn = document.getElementById("btn-left");

ImgArray.forEach(function (item, index) {
  item.style.left = `${index * 100}%`;
});

let counter = 0;

rightBtn.addEventListener("click", function () {
  counter++;
  transf();
});

leftBtn.addEventListener("click", function () {
  counter--;
  transf();
});

function transf() {
  if (counter === ImgArray.length) {
    counter = 0;
  }
  if (counter < 0) {
    counter = ImgArray.length - 1;
  }
  ImgArray.forEach(function (item) {
    item.style.transform = `translateX(-${counter * 100}%)`;
  });
}

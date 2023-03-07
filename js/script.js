// Main javascript file.

// responsive navbar javascript part
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".toggle");

hamburger.addEventListener("click", () => {

  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-item").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);
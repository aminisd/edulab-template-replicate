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

// what other say slider

const people = [
  {
    id: 1,
    img: "../assets/img/customer-img.jpg",
    name: "SAGAR KUMAR SAPKOTA",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis laborum quo, enim, minima saepe dolores, non impedit animi officia eos porro sint quaerat ullam labore recusandae asperiores nihil doloribus.",
  },
  {
    id: 2,
    img: "../assets/img/customer-img.jpg",
    name: "SAGAR KUMAR SAPKOTA",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis laborum quo, enim, minima saepe dolores, non impedit animi officia eos porro sint quaerat ullam labore recusandae asperiores nihil doloribus.",
  },
  {
    id: 3,
    img: "../assets/img/customer-img.jpg",
    name: "SAGAR KUMAR SAPKOTA",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis laborum quo, enim, minima saepe dolores, non impedit animi officia eos porro sint quaerat ullam labore recusandae asperiores nihil doloribus.",
  },
  {
    id: 4,
    img: "../assets/img/customer-img.jpg",
    name: "SAGAR KUMAR SAPKOTA",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis laborum quo, enim, minima saepe dolores, non impedit animi officia eos porro sint quaerat ullam labore recusandae asperiores nihil doloribus.",
  },
];

const slideContainer = document.querySelector(".other-say-container");
const nextButton = document.querySelector(".next-button");
const prevButton = document.querySelector(".prev-button");
console.log(people);

slideContainer.innerHTML = people
  .map((person, slidesIndex) => {
    const { img, name, text } = person;
    let position = 'next'
    if (slidesIndex === 0) {
      position = 'active'
    }
    if (slidesIndex === people.length - 1) {
      position = 'last'
    }
   
    return `<div class="customer-item ${position}">
<div class="div-border">
  <figure class="figure">
    <img src="${img}" alt="customer" />
    <h3 class="customer-name">${name}</h3>
    <p class="stars">
      <i class="fa-solid fa-star fa-yellow"></i>
      <i class="fa-solid fa-star fa-yellow"></i>
      <i class="fa-regular fa-star"></i
      ><i class="fa-regular fa-star"></i
      ><i class="fa-regular fa-star"></i
      >
    </p>
  </figure>
  <p class="customer-p">
   ${text}
  </p>
</div>
</div>`;
  })
  .join(" ");

  const startSlider = (type) => {
    // get all three slides active,last next
    const active = document.querySelector('.active')
    const last = document.querySelector('.last')
    let next = active.nextElementSibling
    if (!next) {
      next = slideContainer.firstElementChild
    }
    active.classList.remove('active')
    last.classList.remove('last')
    next.classList.remove('next')
  
    if (type === 'prev') {
      active.classList.add('next')
      last.classList.add('active')
      next = last.previousElementSibling
      if (!next) {
        next = slideContainer.lastElementChild
      }
      next.classList.remove('next')
      next.classList.add('last')
      return
    }
    active.classList.add('last')
    last.classList.add('next')
    next.classList.add('active')
  }
  nextButton.addEventListener('click', () => {
    startSlider()
  })
  prevButton.addEventListener('click', () => {
    startSlider('prev')
  })



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


// ****gallery ****


const image = document.querySelectorAll('.gallery-image img')
const popup = document.querySelector('.popup-image')
const popupImage = document.querySelector('.popup-image img')



image.forEach(function(item,i){
  item.addEventListener('click', function(){
    popup.style.display='block'
    // popupImage.src=item.getAttribute('src')
    updateimage (i)
  

  })
})

const popu = document.querySelector('.popup-image span')

popu.addEventListener('click',function(){
  popup.style.display='none'
})



  const rightgal= document.getElementById('btn-right');
  const leftgal= document.getElementById('btn-left');

  let loop = 0;

  function updateimage (i){
    let path = `/assets/img/gallery-img${i+1}.jpg`
    popupImage.src=path
    loop = i;

}


  rightgal.addEventListener('click', function(){


    if( loop < image.length-1){
      updateimage(loop + 1)
    }
  
  })
  
  leftgal.addEventListener('click',function(){

    if (loop > 0){
      updateimage(loop - 1);
    }
    
  })



  // Slider JS
  // Modified cconceicao's slider (Amini Version )

var slider = document.getElementById('slider'),
sliderItems = document.getElementById('slides'),
prev = document.getElementById('prev'),
next = document.getElementById('next');

function slide(wrapper, items, prev, next) {
var posX1 = 0,
  posX2 = 0,
  posInitial,
  posFinal,
  threshold = 100,
  slides = items.getElementsByClassName('slide'),
  slidesLength = slides.length,
  slideSize = document.getElementsByClassName('wrapper')[0].offsetWidth,
  firstSlide = slides[0],
  lastSlide = slides[slidesLength - 1],
  cloneFirst = firstSlide.cloneNode(true),
  cloneLast = lastSlide.cloneNode(true),
  index = 0,
  allowShift = true;

// Clone first and last slide
items.appendChild(cloneFirst);
items.insertBefore(cloneLast, firstSlide);
wrapper.classList.add('loaded');

// Mouse events
items.onmousedown = dragStart;

// Touch events
items.addEventListener('touchstart', dragStart);
items.addEventListener('touchend', dragEnd);
items.addEventListener('touchmove', dragAction);

// Click events
prev.addEventListener('click', function () { shiftSlide(-1); console.log('prev') });
next.addEventListener('click', function () { shiftSlide(1);
console.log('next') });

// Transition events
items.addEventListener('transitionend', checkIndex);

setWidth();

function dragStart (e) {
e = e || window.event;
e.preventDefault();
posInitial = items.offsetLeft;

if (e.type == 'touchstart') {
  posX1 = e.touches[0].clientX;
} else {
  posX1 = e.clientX;
  document.onmouseup = dragEnd;
  document.onmousemove = dragAction;
}
}

function dragAction (e) {
e = e || window.event;

if (e.type == 'touchmove') {
  posX2 = posX1 - e.touches[0].clientX;
  posX1 = e.touches[0].clientX;
} else {
  posX2 = posX1 - e.clientX;
  posX1 = e.clientX;
}
items.style.left = (items.offsetLeft - posX2) + "px";
}

function dragEnd (e) {
posFinal = items.offsetLeft;
if (posFinal - posInitial < -threshold) {
  shiftSlide(1, 'drag');
} else if (posFinal - posInitial > threshold) {
  shiftSlide(-1, 'drag');
} else {
  items.style.left = (posInitial) + "px";
}

document.onmouseup = null;
document.onmousemove = null;
}

function shiftSlide(dir, action) {
items.classList.add('shifting');

if (allowShift) {
  if (!action) { posInitial = items.offsetLeft; }

  if (dir == 1) {
    items.style.left = (posInitial - slideSize) + "px";
    index++;      
  } else if (dir == -1) {
    items.style.left = (posInitial + slideSize) + "px";
    index--;      
  }
};

allowShift = false;
}

function checkIndex (){
items.classList.remove('shifting');

if (index == -1) {
  items.style.left = -(slidesLength * slideSize) + "px";
  index = slidesLength - 1;
}

if (index == slidesLength) {
  items.style.left = -(1 * slideSize) + "px";
  index = 0;
}

allowShift = true;
}
}

slide(slider, sliderItems, prev, next);


function setWidth(){


var slider = document.getElementById('slider');

var wrapper = document.getElementsByClassName('wrapper');

var slides = document.getElementsByClassName('slide');


Array.from(slides).forEach((item) => {
item.style.width = wrapper[0].offsetWidth+ "px";

});

// slider.style.left = -(wrapper[0].offsetWidth)+'px';
}

window.addEventListener("resize", setWidth);

  







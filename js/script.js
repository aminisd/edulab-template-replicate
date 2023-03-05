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


const rightBtn=document.getElementById('btn-right')
const leftBtn=document.getElementById('btn-left')
const image = document.getElementById('place-image')

const comments=document.querySelector('.comments')


var collection=[
  {
    id:1,
    img:'/assets/img/page-banner.jpg'

  },

  {
    id:2,
    img:'/assets/img/page-banner2.jpg'

  },


  {
    id:3,
    img:'/assets/img/page-banner3.jpg'

  }
];


currentItem=1;

window.addEventListener('DOMContentLoaded', function(){
  //console.log('Hello pinhas')
 showpics(currentItem)
 
})

function showpics(pic){
  const item = collection[currentItem]
  image.src=item.img
}



rightBtn.addEventListener('click', function(){
  
  currentItem++

  if(currentItem > collection.length-1){
    currentItem=0
  }
  showpics(currentItem)

})


leftBtn.addEventListener('click', function(){
 
  currentItem--

  if (currentItem < 0 ){
    currentItem = collection.length-1
  }
  showpics(currentItem)
})




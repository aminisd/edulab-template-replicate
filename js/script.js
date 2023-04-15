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

const ImgArray = document.querySelectorAll('.img')

const rightBtn=document.getElementById('btn-righte')


const leftBtn=document.getElementById('btn-lefte')


ImgArray.forEach(function(item,index){
  item.style.left=`${index*100}%`;
});

let counter = 0;


rightBtn.addEventListener('click',function(){
counter++;
transf()
})

leftBtn.addEventListener('click',function(){
  counter--;
  transf()
  })



function transf (){

  if (counter===ImgArray.length){
    counter=0
  }
  if (counter<0){

    counter=ImgArray.length-1
  }
  ImgArray.forEach(function(item){
    item.style.transform=`translateX(-${counter * 100}%)`
  })
}

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


  







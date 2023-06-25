// Main javascript file.

// responsive navbar javascript part
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.Navheader');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-links').forEach((n) =>
    n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }),
);

//// ********Slide-bar-Js *********

// what other say slider

const people = [
    {
        id: 1,
        img: '../assets/img/customer-img.jpg',
        name: 'SAGAR KUMAR SAPKOTA',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis laborum quo, enim, minima saepe dolores, non impedit animi officia eos porro sint quaerat ullam labore recusandae asperiores nihil doloribus.',
    },
    {
        id: 2,
        img: '../assets/img/customer-img.jpg',
        name: 'SAGAR KUMAR SAPKOTA',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis laborum quo, enim, minima saepe dolores, non impedit animi officia eos porro sint quaerat ullam labore recusandae asperiores nihil doloribus.',
    },
    {
        id: 3,
        img: '../assets/img/customer-img.jpg',
        name: 'SAGAR KUMAR SAPKOTA',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis laborum quo, enim, minima saepe dolores, non impedit animi officia eos porro sint quaerat ullam labore recusandae asperiores nihil doloribus.',
    },
    {
        id: 4,
        img: '../assets/img/customer-img.jpg',
        name: 'SAGAR KUMAR SAPKOTA',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis laborum quo, enim, minima saepe dolores, non impedit animi officia eos porro sint quaerat ullam labore recusandae asperiores nihil doloribus.',
    },
];

const slideContainer = document.querySelector('.other-say-container');
const nextButton = document.querySelector('.next-button');
const prevButton = document.querySelector('.prev-button');
console.log(people);

slideContainer.innerHTML = people
    .map((person, slidesIndex) => {
        const { img, name, text } = person;
        let position = 'next';
        if (slidesIndex === 0) {
            position = 'active';
        }
        if (slidesIndex === people.length - 1) {
            position = 'last';
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
    .join(' ');

const startSlider = (type) => {
    // get all three slides active,last next
    const active = document.querySelector('.active');
    const last = document.querySelector('.last');
    let next = active.nextElementSibling;
    if (!next) {
        next = slideContainer.firstElementChild;
    }
    active.classList.remove('active');
    last.classList.remove('last');
    next.classList.remove('next');

    if (type === 'prev') {
        active.classList.add('next');
        last.classList.add('active');
        next = last.previousElementSibling;
        if (!next) {
            next = slideContainer.lastElementChild;
        }
        next.classList.remove('next');
        next.classList.add('last');
        return;
    }
    active.classList.add('last');
    last.classList.add('next');
    next.classList.add('active');
};
nextButton.addEventListener('click', () => {
    startSlider();
});
prevButton.addEventListener('click', () => {
    startSlider('prev');
});

// ****gallery ****

const image = document.querySelectorAll('.gallery-image img');
const popup = document.querySelector('.popup-image');
const popupImage = document.querySelector('.popup-image img');

image.forEach(function (item, i) {
    item.addEventListener('click', function () {
        popup.style.display = 'block';
        // popupImage.src=item.getAttribute('src')
        updateimage(i);
    });
});

const popu = document.querySelector('.popup-image span');

popu.addEventListener('click', function () {
    popup.style.display = 'none';
});

const rightgal = document.getElementById('btn-right');
const leftgal = document.getElementById('btn-left');

let loop = 0;

function updateimage(i) {
    let path = `/assets/img/gallery-img${i + 1}.jpg`;
    popupImage.src = path;
    loop = i;
}

rightgal.addEventListener('click', function () {
    if (loop < image.length - 1) {
        updateimage(loop + 1);
    }
});

leftgal.addEventListener('click', function () {
    if (loop > 0) {
        updateimage(loop - 1);
    }
});

// Slider JS
// Modified cconceicao's slider (Amini Version )

var slider = document.getElementById('slider'), // i am taking This later
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next');

var slideSize = document.getElementsByClassName('wrapper')[0].offsetWidth,
    posInitial,
    index = 0;
//console.log(slideSize)

function slide(wrapper, items, prev, next) {
    var posX1 = 0,
        posX2 = 0,
        posFinal,
        threshold = 100,
        slides = items.getElementsByClassName('slide'),
        slidesLength = slides.length,
        // slideSize =  = document.getElementsByClassName('wrapper')[0].offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        allowShift = true;

    // console.log(slideSize);

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
    prev.addEventListener('click', function () {
        shiftSlide(-1);
    });
    next.addEventListener('click', function () {
        shiftSlide(1);
    });

    // Transition events
    items.addEventListener('transitionend', checkIndex);

    setWidth();

    function dragStart(e) {
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

    function dragAction(e) {
        e = e || window.event;

        if (e.type == 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }
        items.style.left = items.offsetLeft - posX2 + 'px';
    }

    function dragEnd(e) {
        posFinal = items.offsetLeft;
        if (posFinal - posInitial < -threshold) {
            shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, 'drag');
        } else {
            items.style.left = posInitial + 'px';
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }

    function shiftSlide(dir, action) {
        items.classList.add('shifting');

        console.log(posInitial);

        if (allowShift) {
            if (!action) {
                posInitial = items.offsetLeft;
                console.log('sdfsdfsdf');
            }

            if (dir == 1) {
                items.style.left = posInitial - slideSize + 'px';
                index++;
            } else if (dir == -1) {
                items.style.left = posInitial + slideSize + 'px';
                index--;
            }
        }

        allowShift = false;
    }

    function checkIndex() {
        items.classList.remove('shifting');

        if (index == -1) {
            items.style.left = -(slidesLength * slideSize) + 'px';
            index = slidesLength - 1;
        }

        if (index == slidesLength) {
            items.style.left = -(1 * slideSize) + 'px';
            index = 0;
        }

        allowShift = true;
    }
}

slide(slider, sliderItems, prev, next);

function setWidth() {
    var slides = document.getElementsByClassName('slide');

    slideSize = document.getElementsByClassName('wrapper')[0].offsetWidth;

    Array.from(slides).forEach((item) => {
        item.style.width = slideSize + 'px';
    });
    document.getElementById('slides').style.left = -slideSize + 'px';

    // slider.style.left = -(wrapper[0].offsetWidth)+'px';
}

window.addEventListener('resize', setWidth);

// last slider pinhas

var sliderPi = document.getElementById('slider_pi'),
    sliderItemsPi = document.getElementById('slides_pi'),
    prevPi = document.getElementById('right'),
    nextPi = document.getElementById('left');

var slidesizePi = document.getElementsByClassName('wrapper_pi')[0].offsetWidth,
    posInitialPi,
    indexPi = 0;

function slidePi(wraper, itemss, prevv, nextt) {
    var posiX1pi = 0,
        posiX2pi = 0,
        posFinalPi,
        thresholdPi = 100,
        slidesPi = itemss.getElementsByClassName('slide_pi'),
        slidesLengthPi = slidesPi.length,
        firstSlidePi = slidesPi[0],
        lastSlidePi = slidesPi[slidesLengthPi - 1],
        cloneFirstPi = firstSlidePi.cloneNode(true),
        cloneLastPi = lastSlidePi.cloneNode(true),
        allowShiftPi = true,
        caretMesure = document.getElementsByClassName('carte')[0].offsetWidth + 30,
        cartLenth = document.getElementsByClassName('carte').length;

    console.log(cartLenth);

    // clone fist and last

    itemss.appendChild(cloneFirstPi);
    itemss.insertBefore(cloneLastPi, firstSlidePi);
    wraper.classList.add('loaded');

    // All Mouse And EVENTS Here ...... START

    // NOUSE event

    itemss.onmousedown = draStartPi;

    //touch event

    itemss.addEventListener('touchstart', draStartPi);
    itemss.addEventListener('touchend', dragEndPi);
    itemss.addEventListener('touchmove', dragActionPi);

    // All Mouse And EVENTS Here ...... END

    // event onclick

    prevv.addEventListener('click', function () {
        shiftSlidePi(-1);
    });

    nextt.addEventListener('click', function () {
        shiftSlidePi(1);
    });

    itemss.addEventListener('transitionend', checkindexPi);

    setWidthPi();

    function draStartPi(e) {
        e = e || window.event;

        e.preventDefault();
        posInitialPi = itemss.offsetLeft;

        if (e.type == 'touchstart') {
            posiX1pi = e.touches[0].clientX;
        } else {
            posiX1pi = e.clientX;
            document.onmouseup = dragEndPi;
            document.onmousemove = dragActionPi;
        }
    }

    function dragActionPi(e) {
        e = e || window.event;

        if (e.type == 'touchmove') {
            posiX2pi = posiX1pi - e.touches[0].clientX;
            posiX1pi = e.touches[0].clientX;
        } else {
            posiX2pi = posiX1pi - e.clientX;
            posiX1pi = e.clientX;
        }

        itemss.style.left = itemss.offsetLeft - posiX2pi + 'px';
    }

    function dragEndPi(e) {
        posFinalPi = itemss.offsetLeft;

        if (posFinalPi - posInitialPi < -thresholdPi) {
            shiftSlidePi(1, 'drag');
        } else if (posFinalPi - posInitialPi > thresholdPi) {
            shiftSlidePi(-1, 'drag');
        } else {
            itemss.style.left = posInitialPi + 'px';
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }

    function shiftSlidePi(dir, action) {
        itemss.classList.add('shifting');

        if (allowShiftPi) {
            if (!action) {
                posInitialPi = itemss.offsetLeft;
            }
            if (dir == 1) {
                itemss.style.left = posInitialPi - caretMesure + 'px';
                indexPi++;
            } else if (dir == -1) {
                itemss.style.left = posInitialPi + caretMesure + 'px';
                indexPi--;
                console.log(indexPi);
            }
        }
        allowShiftPi = false;
    }

    function checkindexPi() {
        itemss.classList.remove('shifting');

        if (indexPi == -1) {
            itemss.style.left = -(cartLenth * slidesizePi) + 'px';

            indexPi = cartLenth - 1;
        }

        if (indexPi == cartLenth) {
            itemss.style.left = -(1 * slidesizePi) + 'px';
            indexPi = 0;
        }
        allowShiftPi = true;
    }
}

slidePi(sliderPi, sliderItemsPi, prevPi, nextPi);

function setWidthPi() {
    var piSlides = document.getElementsByClassName('slide_pi'),
        piSlideSize = document.getElementsByClassName('wrapper_pi')[0].offsetWidth;

    Array.from(piSlides).forEach(function (item) {
        item.style.width = piSlideSize + 'px';
    });

    document.getElementById('slides_pi').style.left = -piSlideSize + 'px';
}

window.addEventListener('resize', setWidthPi);

// Latest News Pinhas

var slider_flo = document.getElementById('slider_flo'),
    sliderItemsflo = document.getElementById('slides_flo'),
    prevFlo = document.getElementById('right_click'),
    nextFlo = document.getElementById('left_click');

var slideSizeFlo = document.getElementsByClassName('wrapper_flo')[0].offsetWidth,
    posInitialFlo,
    indexFlo = 0;

function slideFlo(wrapFlo, itms, prvv, nxtt) {
    var posXx1 = 0,
        posXx2 = 0,
        posFinalFlo,
        thresholdFlo = 100,
        slides_F = itms.getElementsByClassName('slide_flo'),
        slidesLengthFlo = slides_F.length,
        firstSlideflo = slides_F[0],
        lastSlideFlo = slides_F[slidesLengthFlo - 1],
        cloneFirstFlo = firstSlideflo.cloneNode(true),
        cloneLastFlo = lastSlideFlo.cloneNode(true),
        allowShiftFlo = true,
        item1Lenth = document.getElementsByClassName('item1')[0].offsetWidth + 40,
        itemNombre = document.getElementsByClassName('item1').length;
    console.log(itemNombre);

    // clone first and Last slide

    itms.appendChild(cloneFirstFlo);
    itms.insertBefore(cloneLastFlo, firstSlideflo);
    console.log(slides_F);

    //  All Mouse and Event here ...Start

    itms.onmousedown = dragStartFlo;

    // touch event

    itms.addEventListener('touchstart', dragStartFlo);
    itms.addEventListener('touchend', dragEndFlo);
    itms.addEventListener('touchmove', dragActionFlo);

    //  All Mouse and Event here ...End

    // Event click

    prvv.addEventListener('click', function () {
        shiftSlideflo(-1);
    });

    nxtt.addEventListener('click', function () {
        shiftSlideflo(1);
    });

    itms.addEventListener('transitionend', checkindexFlo);

    setWidthFlo();

    function dragStartFlo(e) {
        e = e || window.event;

        e.preventDefault();

        posInitialFlo = itms.offsetLeft;

        if (e.type == 'touchstart') {
            posXx1 = e.touches[0].clientX;
        } else {
            posXx1 = e.clientX;
            document.onmouseup = dragEndFlo;
            document.onmousemove = dragActionFlo;
        }
    }

    function dragActionFlo(e) {
        e = e || window.event;

        if (e.type == 'touchmove') {
            posXx2 = posXx1 - e.touches[0].clientX;
            posXx1 = e.touches[0].clientX;
        } else {
            posXx2 = posXx1 - e.clientX;
            posXx1 = e.clientX;
        }

        itms.style.left = itms.offsetLeft - posXx2 + 'px';
    }

    function dragEndFlo(e) {
        posFinalFlo = itms.offsetLeft;

        if (posFinalFlo - posInitialFlo < -thresholdFlo) {
            shiftSlideflo(1, 'drag');
        } else if (posFinalFlo - posInitialFlo > thresholdFlo) {
            shiftSlideflo(-1, 'drag');
        } else {
            itms.style.left = posInitialFlo + 'px';
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }

    function shiftSlideflo(dir, action) {
        itms.classList.add('shifting');

        if (allowShiftFlo) {
            if (!action) {
                posInitialFlo = itms.offsetLeft;
            }

            if (dir == 1) {
                itms.style.left = posInitialFlo - item1Lenth + 'px';
                indexFlo++;
                //console.log(indexFlo)
            }

            if (dir == -1) {
                itms.style.left = posInitialFlo + item1Lenth + 'px';
                indexFlo--;
                console.log(indexFlo);
            }
        }

        allowShiftFlo = false;
    }

    function checkindexFlo() {
        itms.classList.remove('shifting');

        if (indexFlo == -1) {
            itms.style.left = -(itemNombre * slideSizeFlo) + 'px';
            indexFlo = itemNombre - 1;
        }

        if (indexFlo == itemNombre) {
            itms.style.left = -(1 * slideSizeFlo) + 'px';
            indexFlo = 0;
        }
        allowShiftFlo = true;
    }
}

slideFlo(slider_flo, sliderItemsflo, prevFlo, nextFlo);

function setWidthFlo() {
    var floSlides = document.getElementsByClassName('slide_flo'),
        floSlideSize = document.getElementsByClassName('wrapper_flo')[0].offsetWidth;

    Array.from(floSlides).forEach(function (item) {
        item.style.width = floSlideSize + 'px';
    });

    document.getElementById('slides_flo').style.left = -floSlideSize + 'px';
}

window.addEventListener('resize', setWidthFlo);

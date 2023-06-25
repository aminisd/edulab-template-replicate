// Main javascript file.

// responsive navbar javascript part
import './navbar/navbar';

//// ********Slide-bar-Js *********

// what other say slider
import './carousel/whatOtherSay';
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

import './carousel/firstCarousel';

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

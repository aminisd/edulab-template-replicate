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

    function dragEndPi() {
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
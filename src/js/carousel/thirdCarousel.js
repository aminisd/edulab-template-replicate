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

    function dragEndFlo() {
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

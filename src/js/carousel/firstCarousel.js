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
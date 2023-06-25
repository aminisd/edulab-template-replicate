
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

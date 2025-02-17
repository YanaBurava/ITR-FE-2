const btnLeft = document.querySelector('.arrow.left');
const btnRight = document.querySelector('.arrow.right');
const sliderTrack = document.querySelector('.slider');

function shiftRight() {
    const firstPet = sliderTrack.firstElementChild;
    sliderTrack.appendChild(firstPet.cloneNode(true)); 
    sliderTrack.removeChild(firstPet); 
}

function shiftLeft() {
    const lastPet = sliderTrack.lastElementChild;
    sliderTrack.insertBefore(lastPet.cloneNode(true), sliderTrack.firstElementChild);
    sliderTrack.removeChild(lastPet);
}

btnLeft.addEventListener('click', (event) => {
    event.preventDefault();
    shiftLeft();
});

btnRight.addEventListener('click', (event) => {
    event.preventDefault();
    shiftRight();
});

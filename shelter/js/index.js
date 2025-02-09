







// POPUP

import petsArray from './petsInfo.js'; 

const popupWindow = document.getElementById('popupWindow');
const closePopup = document.getElementById('closePopup');
const overflow = document.getElementById('overflow');
const body = document.body;

function GeneratePopupInfo(card) {
    const id = parseInt(card.id);
    const pet = petsArray[id]; 

    if (!pet) {
        console.error('Питомец не найден для ID:', id);
        return;
    }

    popupWindow.querySelector('.popup__info').innerHTML = `
    <img class="popup__image" src='${pet.img}' alt='${pet.name}'>
<div class="popup__content">
<h3 class="popup__title">${pet.name}</h3>
<h4 class="popup__subtitle">${pet.type} - ${pet.breed}</h4>
<p class="popup__description">${pet.description}</p>
<ul class="popup__list">
    <li class="popup__list-item">
        <span class="popup__list-item-title">Age:</span>
        <span class="popup__list-item-text">${pet.age}</span>
    </li>
    <li class="popup__list-item">
        <span class="popup__list-item-title">Inoculations:</span>
        <span class="popup__list-item-text">${pet.inoculations.join(', ')}</span>
    </li>
    <li class="popup__list-item">
        <span class="popup__list-item-title">Diseases:</span>
        <span class="popup__list-item-text">${pet.diseases.join(', ')}</span>
    </li>
    <li class="popup__list-item">
        <span class="popup__list-item-title">Parasites:</span>
        <span class="popup__list-item-text">${pet.parasites.join(', ')}</span>
    </li>
</ul>
</div>
`;
}
document.body.addEventListener('click', (event) => {
    const petCard = event.target.closest('.pet');
    if (petCard) {
        overflow.style.visibility = "visible";
        overflow.style.opacity = "1";
        popupWindow.style.display = 'block';
        body.classList.add("stop-scrolling"); 
        GeneratePopupInfo(petCard);
    }
});

closePopup.addEventListener('click', () => {
    closePopupWindow();
});

overflow.addEventListener('click', (event) => {
    if (event.target === overflow) { 
        closePopupWindow();
    }
});

function closePopupWindow() {
    overflow.style.visibility = "hidden";
    overflow.style.opacity = "0";
    popupWindow.style.display = 'none';
    body.classList.remove("stop-scrolling");
}


// Slider
const btnLeft = document.querySelector('.arrow.left');
const btnRight = document.querySelector('.arrow.right');
const sliderTrack = document.querySelector('.slider');

init();

function drawSlides(direction) {
    const slides = Array.from(sliderTrack.children); 

    if (direction === 'Right') {
        const firstSlide = slides.shift();
        sliderTrack.appendChild(firstSlide);
    } else if (direction === 'Left') {
       
        const lastSlide = slides.pop();
        sliderTrack.insertBefore(lastSlide, slides[0]);
    }
}

function init() {
    drawSlides('Right');
}

btnLeft.addEventListener('click', (event) => {
    event.preventDefault();
    drawSlides('Left');
});

btnRight.addEventListener('click', (event) => {
    event.preventDefault();
    drawSlides('Right');
});

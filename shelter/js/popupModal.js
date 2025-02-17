// POPUP

import petsArray from './petsInfo.js'; 
const slider = document.querySelector('.slider');

export function createPetCard(pet) {
    const petDiv = document.createElement('div');
    petDiv.classList.add('pet');
    petDiv.setAttribute('id', pet.id);
    
    const img = document.createElement('img');
    img.src = pet.img;
    img.alt = pet.name;
    
    const name = document.createElement('p');
    name.textContent = pet.name;
    
    const button = document.createElement('button');
    button.classList.add('btn-learn');
    button.textContent = 'Learn more';
    
    petDiv.appendChild(img);
    petDiv.appendChild(name);
    petDiv.appendChild(button);
    
    return petDiv;
}

function loadPets(containerSelector) {
    const container = document.querySelector(containerSelector);
    
    if (!container) {
        console.error('Container not found:', containerSelector);
        return;
    }

    petsArray.forEach(pet => {
        const petCard = createPetCard(pet);
        container.appendChild(petCard);
    });
}


document.addEventListener('DOMContentLoaded', function () {
    loadPets('.slider'); 
    loadPets ('#pets-c');
});


const popupWindow = document.getElementById('popupWindow');
const closePopup = document.getElementById('closePopup');
const overflow = document.getElementById('overflow');
const body = document.body;

function GeneratePopupInfo(card) {
    const id = parseInt(card.id);
    const pet = petsArray[id]; 

    if (!pet) {
        console.error('Not found for ID:', id);
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


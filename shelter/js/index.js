import petsArray from './petsInfo.js'; 

const popupWindow = document.getElementById('popupWindow');
const closePopup = document.getElementById('closePopup');
const overflow = document.getElementById('overflow');
const body = document.body;

// Функция для генерации информации о питомце в попапе
function GeneratePopupInfo(card) {
    const id = parseInt(card.id);
    const pet = petsArray[id]; // Здесь petsArray должно быть массивом питомцев с данными

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
// Обработчик клика по карточке питомца (открытие попапа)
document.body.addEventListener('click', (event) => {
    const petCard = event.target.closest('.pet');
    if (petCard) {
        // Показываем попап
        overflow.style.visibility = "visible";
        overflow.style.opacity = "1";
        popupWindow.style.display = 'block';
        body.classList.add("stop-scrolling"); 
        GeneratePopupInfo(petCard);
    }
});

// Обработчик клика по кнопке закрытия попапа
closePopup.addEventListener('click', () => {
    closePopupWindow();
});

// Обработчик клика по области "overflow" для закрытия попапа
overflow.addEventListener('click', (event) => {
    if (event.target === overflow) { // Проверяем, был ли клик именно по области вокруг попапа
        closePopupWindow();
    }
});

// Закрытие попапа — общая функция для всех случаев
function closePopupWindow() {
    overflow.style.visibility = "hidden";
    overflow.style.opacity = "0";
    popupWindow.style.display = 'none';
    body.classList.remove("stop-scrolling");
}

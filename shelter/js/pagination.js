import petsArray from './petsInfo.js'; 
import { createPetCard } from './popupModal.js';

const itemsPerPage = 3; // Количество питомцев на одной странице
let currentPage = 1;
function displayPets(page) {
    const petsContainer = document.getElementById('pets-c');
    petsContainer.innerHTML = '';
  
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const petsToShow = petsArray.slice(startIndex, endIndex);
  
    petsToShow.forEach(pet => {
      const petCard = createPetCard(pet);
      petsContainer.appendChild(petCard);
    });
  
    updatePagination(page);
  }
  
  function updatePagination(page) {
    const totalPages = Math.ceil(petsArray.length / itemsPerPage);
  
    // Обновляем текст номера страницы
    const pageNumber = document.getElementById('page-number');
    pageNumber.textContent = page;
  
    const doubleLeft = document.getElementById('double-left');
    const left = document.getElementById('left');
    const right = document.getElementById('right');
    const doubleRight = document.getElementById('double-right');
  
    if (page === 1) {
      doubleLeft.classList.add('disabled');
      left.classList.add('disabled');
    } else {
      doubleLeft.classList.remove('disabled');
      left.classList.remove('disabled');
    }
  
    if (page === totalPages) {
      doubleRight.classList.add('disabled');
      right.classList.add('disabled');
    } else {
      doubleRight.classList.remove('disabled');
      right.classList.remove('disabled');
    }
  }
  
  function setupPagination() {
    const doubleLeft = document.getElementById('double-left');
    const left = document.getElementById('left');
    const right = document.getElementById('right');
    const doubleRight = document.getElementById('double-right');
    
    doubleLeft.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage = 1;
        displayPets(currentPage);
      }
    });
  
    left.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        displayPets(currentPage);
      }
    });
  
    right.addEventListener('click', () => {
      const totalPages = Math.ceil(petsArray.length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        displayPets(currentPage);
      }
    });
  
    doubleRight.addEventListener('click', () => {
      const totalPages = Math.ceil(petsArray.length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage = totalPages;
        displayPets(currentPage);
      }
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    displayPets(currentPage);  
    setupPagination();
  });
import petsArray from './petsInfo.js'; 
import { createPetCard } from './popupModal.js';

const AMOUNT_OF_PETS = petsArray.length;
let petsCount = 0;  
let totalPages = 0;

const mobileWidthMediaQuery = window.matchMedia('(max-width: 767px)');
const tabletWidthMediaQuery = window.matchMedia(
  '(min-width: 768px) and (max-width: 1279px)'
);
const desktopWidthMediaQuery = window.matchMedia('(min-width: 1280px)');

switch (true) {
  case mobileWidthMediaQuery.matches:
    petsCount = 3;
    break;
  case tabletWidthMediaQuery.matches:
    petsCount = 6;
    break;
  case desktopWidthMediaQuery.matches:
    petsCount = 8;
    break;
  default:
    break;
}

totalPages = Math.ceil(AMOUNT_OF_PETS / petsCount); 

console.log(`Pets per page: ${petsCount}`);
console.log(`Total pages: ${totalPages}`);

let currentPage = 1;

function displayPets(page) {
    const petsContainer = document.getElementById('pets-c');
    petsContainer.innerHTML = ''; 
  
    const startIndex = (page - 1) * petsCount;
    const endIndex = startIndex + petsCount;
    const petsToShow = petsArray.slice(startIndex, endIndex);
    petsToShow.forEach(pet => {
      const petCard = createPetCard(pet);
      petsContainer.appendChild(petCard);
    });
  
    updatePagination(page);
}

function updatePagination(page) {
    const totalPages = Math.ceil(petsArray.length / petsCount); 

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
      if (currentPage < totalPages) {
        currentPage++;
        displayPets(currentPage);
      }
    });
  
    doubleRight.addEventListener('click', () => {
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

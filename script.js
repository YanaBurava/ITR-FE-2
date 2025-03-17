const containerElement = document.querySelector('.container');
const formElement = document.querySelector('.search-form');
const searchElement = document.querySelector('.search-input');
const clearBtnElement = document.querySelector('.clear-button');

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

initializeApp();

function initializeApp() {
  getData(API_URL);

  formElement.addEventListener('submit', handleSearch);
  
  clearBtnElement.addEventListener('click', handleClear);
}

async function getData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    showData(data.results);
  } catch (error) {
    console.error('Error fetching data:', error);
    showError('Failed to fetch data. Please try again later.');
  }
}

function showData(data) {
  containerElement.innerHTML = '';

  if (data.length > 0) {
    data.forEach(({ title, poster_path, vote_average, overview }) => {
      const movieCard = createMovieCard(title, poster_path, vote_average, overview);
      containerElement.append(movieCard);
    });
  } else {
    showError('Sorry, there is nothing that matches your search');
  }
}

function createMovieCard(title, posterPath, voteAverage, overview) {
  const rating = voteAverage === 0 ? '-' : voteAverage;

  const movieCard = document.createElement('div');
  movieCard.classList.add('movie');

  movieCard.innerHTML = `
    <img src="${IMG_PATH + posterPath}" alt="${title}" class="movie-image" />
    <div class="movie-info">
      <h3 class="movie-title">${title}</h3>
      <span class="rating ${getRateColor(voteAverage)}">${rating}</span>
    </div>
    <div class="overview">
      <h3 class="overview-title">Overview</h3>
      <p>${overview}</p>
    </div>
  `;

  return movieCard;
}

function getRateColor(rating) {
  if (rating >= 8) {
    return 'green';
  } else if (rating >= 5) {
    return 'yellow';
  } else {
    return 'red';
  }
}

function handleSearch(e) {
  e.preventDefault();
  const searchTerm = searchElement.value.trim();

  if (searchTerm) {
    getData(`${SEARCH_URL}&query=${searchTerm}`);
  } else {
    getData(API_URL);
  }
}

function handleClear() {
  searchElement.value = '';
  getData(API_URL);
}

function showError(message) {
  const errorElement = document.createElement('p');
  errorElement.classList.add('error-message');
  errorElement.innerHTML = message;
  containerElement.append(errorElement);
}
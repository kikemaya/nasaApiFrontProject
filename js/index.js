'use strict';

const API_KEY = "jIOX3aArf0zAYvUK9xkKaaGGqCjChycgiLnl9Cgh";

// API HTML SELECTIONS
const showInfo = document.querySelector('#showInfo');
const titleDom = document.querySelector('#title')
const imgDom = document.querySelector('#img')
const explanationDom = document.querySelector('#explanation')

// MODAL SELECTIONS
const modal = document.querySelector('.modal-con');
const overlay = document.querySelector('.overlay-mod');
const btnCloseModal = document.querySelector('.modal-con__close');
const btnShowModal = document.querySelector('.show-modal');

//API FUNCTIONS
showInfo.addEventListener('click', () => {
  loadInfo();
})
async function loadInfo() {
  const dateInput = document.querySelector('#date-input').value
  
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${dateInput}&start_date=&end_date=&count=&thumbs`);
    const data = await response.json();

    const title = data.title;
    const img = data.hdurl;
    const explanation = data.explanation;
    showData(title, img, explanation);
  } catch (error) {
    // handle error
    showErr();
    console.error(error);
  }

 }
function showData(title, img, explanation) {
  titleDom.classList.remove('alert', 'alert-danger');
  explanationDom.classList.remove('error-text')
  titleDom.classList.add('alert', 'alert-info');
  titleDom.textContent = title;
  imgDom.src = img;
  explanationDom.textContent = explanation;
}
function showErr() {
  titleDom.classList.add('alert', 'alert-danger');
  titleDom.textContent = "Oops!. Houston, we've had a problem here.";
  // imgDom.src = "../img/errorImg.jpg";
  imgDom.src = "https://image.freepik.com/free-vector/404-error-design-with-astronaut_23-2147734936.jpg";
  explanationDom.classList.add('error-text')
  explanationDom.textContent = "No information available. Please, search again with another date.";
}

//MODAL FUNCTIONS
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnShowModal.addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
});
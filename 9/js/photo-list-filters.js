import {createRandomIntegersArrayFromRange, debounce} from './utils.js';
import {removePhotosList, photoList} from './photo-list.js';

const photoListFilters = document.querySelector('.img-filters');
const photoFiltersForm = photoListFilters.querySelector('.img-filters__form');
const photoFilters = photoListFilters.querySelectorAll('.img-filters__button');

const toggleActiveButton = (button) => {
  photoFilters.forEach((el) => {
    el.classList.remove('img-filters__button--active');
  });
  button.classList.add('img-filters__button--active');
};

const applyFilter = (id, photosArray) => {
  let newPhotoArray = [];
  switch (id) {
    case 'filter-random':
      newPhotoArray = createRandomIntegersArrayFromRange(0, photosArray.length, 10)
        .map((index) => photosArray[index]);
      break;
    case 'filter-discussed':
      newPhotoArray = photosArray.slice().sort((a, b) => b.comments.length - a.comments.length);
      break;
    default:
      newPhotoArray = photosArray;
  }
  removePhotosList();
  photoList(newPhotoArray);
};

const applyTimeOut = debounce(applyFilter);

const initFilterButtons = (photosArray) => {
  photoFiltersForm.addEventListener('click', (evt) => {
    if (evt.target.tagName === 'BUTTON') {
      toggleActiveButton(evt.target);
      applyTimeOut(evt.target.id, photosArray);
    }
  });
};

export {
  initFilterButtons
};

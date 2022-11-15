import {renderDetail} from './render-photo-detail.js';

const photoListFiltersElement = document.querySelector('.img-filters');
const picturesListElement = document.querySelector('.pictures');
let photos = [];

const onPictureClicked = (evt) => {
  if (evt.target.tagName === 'IMG') {
    const photoId = Number(evt.target.closest('a.picture').dataset.id);
    const photo = photos.find((element) => photoId === element.id);
    renderDetail(photo);
  }
};

const renderPhotoList = (data) => {
  photos = data;
  photoListFiltersElement.classList.remove('img-filters--inactive');

  const template = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const photosListFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoItem = template.cloneNode(true);
    photoItem.querySelector('.picture__img').src = photo.url;
    photoItem.querySelector('.picture__comments').textContent = photo.comments.length.toString();
    photoItem.querySelector('.picture__likes').textContent = photo.likes.toString();
    photoItem.dataset.id = photo.id;
    photosListFragment.appendChild(photoItem);
  });
  picturesListElement.appendChild(photosListFragment);

  picturesListElement.addEventListener('click', onPictureClicked);
};

const removePhotosList = () => {
  const photoElements = picturesListElement.querySelectorAll('.picture');
  photoElements.forEach((photoElement) => {
    photoElement.remove();
  });
  picturesListElement.removeEventListener('click', onPictureClicked);
};

export {
  renderPhotoList,
  removePhotosList
};

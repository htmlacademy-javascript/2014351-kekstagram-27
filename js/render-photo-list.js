import {generatePhotosArray} from './photo.js';
import {renderDetail} from './render-photo-detail.js';
import {PHOTOS_COUNT} from './config.js';

const generatedPhotosArray = generatePhotosArray(PHOTOS_COUNT);

const renderPhotoList = () => {
  const template = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const photosListFragment = document.createDocumentFragment();

  generatedPhotosArray.forEach((photo) => {
    const photoItem = template.cloneNode(true);
    photoItem.querySelector('.picture__img').src = photo.url;
    photoItem.querySelector('.picture__comments').textContent = photo.comments.length.toString();
    photoItem.querySelector('.picture__likes').textContent = photo.likes.toString();
    photoItem.dataset.id = photo.id;
    photosListFragment.appendChild(photoItem);
  });
  document.querySelector('.pictures').appendChild(photosListFragment);

  document.querySelector('.pictures').addEventListener('click', (evt) => {
    if (evt.target.tagName === 'IMG') {
      const photoId = Number(evt.target.closest('a.picture').dataset.id);
      const photo = generatedPhotosArray.find((element) => photoId === element.id);
      renderDetail(photo);
    }
  });
};

export {
  renderPhotoList,
};

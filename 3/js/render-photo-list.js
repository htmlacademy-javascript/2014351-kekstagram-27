import {generatePhotosArray} from './photo.js';
import {renderDetail} from './render-photo-detail.js';

const PHOTOS_COUNT = 25;

const renderPhotoList = () => {
  const template = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const photosArray = generatePhotosArray(PHOTOS_COUNT);

  const photosListFragment = document.createDocumentFragment();

  photosArray.forEach((photo) => {
    const photoItem = template.cloneNode(true);
    photoItem.addEventListener('click', () => {
      renderDetail(photo);
    });
    photoItem.querySelector('.picture__img').src = photo.url;
    photoItem.querySelector('.picture__comments').src = photo.comments.length;
    photoItem.querySelector('.picture__likes').src = photo.likes;
    photosListFragment.appendChild(photoItem);
  });
  document.querySelector('.pictures').appendChild(photosListFragment);
};

export {renderPhotoList};

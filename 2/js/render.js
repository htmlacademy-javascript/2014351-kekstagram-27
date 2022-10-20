import {generatePhotosArray} from './photo.js';

const template = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photosArray = generatePhotosArray(25);

const photosListFragment = document.createDocumentFragment();

photosArray.forEach((photo) => {
  const photoItem = template.cloneNode(true);
  photoItem.querySelector('.picture__img').src = photo.url;
  photoItem.querySelector('.picture__comments').src = photo.comments.length;
  photoItem.querySelector('.picture__likes').src = photo.likes;
  photosListFragment.appendChild(photoItem);
});
document.querySelector('.pictures').appendChild(photosListFragment);

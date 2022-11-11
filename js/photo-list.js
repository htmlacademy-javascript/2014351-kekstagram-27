import {renderDetail} from './render-photo-detail.js';

const photoListFilters = document.querySelector('.img-filters');
const pictures = document.querySelector('.pictures');

const photoList = (photosArray) => {
  photoListFilters.classList.remove('img-filters--inactive');

  const template = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const photosListFragment = document.createDocumentFragment();

  photosArray.forEach((photo) => {
    const photoItem = template.cloneNode(true);
    photoItem.querySelector('.picture__img').src = photo.url;
    photoItem.querySelector('.picture__comments').textContent = photo.comments.length.toString();
    photoItem.querySelector('.picture__likes').textContent = photo.likes.toString();
    photoItem.dataset.id = photo.id;
    photosListFragment.appendChild(photoItem);
  });
  pictures.appendChild(photosListFragment);

  document.querySelector('.pictures').addEventListener('click', (evt) => {
    if (evt.target.tagName === 'IMG') {
      const photoId = Number(evt.target.closest('a.picture').dataset.id);
      const photo = photosArray.find((element) => photoId === element.id);
      renderDetail(photo);
    }
  });
};

const removePhotosList = () => {
  const photos = pictures.querySelectorAll('.picture');
  photos.forEach((photo) => {
    photo.remove();
  });
};

export {
  photoList,
  removePhotosList
};

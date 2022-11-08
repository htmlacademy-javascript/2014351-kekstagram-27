
import {renderDetail} from './render-photo-detail.js';
import {getPhotosArray} from './photos-api.js';
import {showErrorNotify} from './notifications.js';

const renderPhotoList = async () => {
  try {
    const photosArray = await getPhotosArray();

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
    document.querySelector('.pictures').appendChild(photosListFragment);

    document.querySelector('.pictures').addEventListener('click', (evt) => {
      if (evt.target.tagName === 'IMG') {
        const photoId = Number(evt.target.closest('a.picture').dataset.id);
        const photo = photosArray.find((element) => photoId === element.id);
        renderDetail(photo);
      }
    });
  } catch (err) {
    showErrorNotify('Произошла ошибка при загрузке данных');
  }
};

export {
  renderPhotoList,
};

import {bigPicture} from './render-photo-detail.js';

const modalCloseButton = bigPicture.querySelector('.big-picture__cancel');

const closeModal = () => {
  modalCloseButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });
};

export {closeModal};

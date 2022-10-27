import {bigPicture} from './render-photo-detail.js';

const modalCloseButton = bigPicture.querySelector('.big-picture__cancel');

const onEscapeDown = (evt) => {
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscapeDown);
  }
};

const closeModal = () => {
  modalCloseButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscapeDown);
  });
  document.addEventListener('keydown', onEscapeDown);
};

export {closeModal};

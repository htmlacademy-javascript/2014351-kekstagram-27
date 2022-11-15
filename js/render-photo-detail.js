import {clearCommentsList, onCommentsLoadButtonClicked, renderComments} from './render-comments.js';

const bigPictureElement = document.querySelector('.big-picture');
const modalCloseButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsLoadButtonElement = bigPictureElement.querySelector('.comments-loader');

const toggleBigPicture = () => {
  bigPictureElement.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};

const onEscapeDown = (evt) => {
  if (evt.key === 'Escape') {
    toggleBigPicture();
    document.removeEventListener('keydown', onEscapeDown);
    commentsLoadButtonElement.removeEventListener('click', onCommentsLoadButtonClicked);
  }
};

const renderDetail = (photo) => {
  bigPictureElement.querySelector('.big-picture__img').children[0].src = photo.url;
  bigPictureElement.querySelector('.likes-count').textContent = String(photo.likes);
  bigPictureElement.querySelector('.comments-count').textContent = String(photo.comments.length);
  bigPictureElement.querySelector('.social__caption').textContent = photo.description;

  clearCommentsList();

  renderComments(photo.comments);

  toggleBigPicture();

  document.addEventListener('keydown', onEscapeDown);
};

const initCloseBigPicture = () => {
  modalCloseButtonElement.addEventListener('click', () => {
    toggleBigPicture();
    document.removeEventListener('keydown', onEscapeDown);
    commentsLoadButtonElement.removeEventListener('click', onCommentsLoadButtonClicked);
  });
};

export {
  renderDetail,
  initCloseBigPicture,
};


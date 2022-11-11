import {clearCommentsList, onCommentsLoadButtonClicked, renderComments} from './render-comments.js';

const bigPicture = document.querySelector('.big-picture');
const modalCloseButton = bigPicture.querySelector('.big-picture__cancel');
const commentsLoadButton = bigPicture.querySelector('.comments-loader');

const toggleBigPicture = () => {
  bigPicture.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};

const onEscapeDown = (evt) => {
  if (evt.key === 'Escape') {
    toggleBigPicture();
    document.removeEventListener('keydown', onEscapeDown);
    commentsLoadButton.removeEventListener('click', onCommentsLoadButtonClicked);
  }
};

const renderDetail = (photo) => {
  bigPicture.querySelector('.big-picture__img').children[0].src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = String(photo.likes);
  bigPicture.querySelector('.comments-count').textContent = String(photo.comments.length);
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  clearCommentsList();

  renderComments(photo.comments);

  toggleBigPicture();

  document.addEventListener('keydown', onEscapeDown);
};

const initCloseBigPicture = () => {
  modalCloseButton.addEventListener('click', () => {
    toggleBigPicture();
    document.removeEventListener('keydown', onEscapeDown);
    commentsLoadButton.removeEventListener('click', onCommentsLoadButtonClicked);
  });
};

export {
  renderDetail,
  initCloseBigPicture,
};


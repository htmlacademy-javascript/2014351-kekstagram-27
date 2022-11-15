import {COUNT_OF_LOADED_COMMENTS} from './config.js';

const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const bigPictureElement = document.querySelector('.big-picture');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentsListFragment = document.createDocumentFragment();
const commentsLoadButtonElement = bigPictureElement.querySelector('.comments-loader');
const showedCommentsCounterElement = bigPictureElement.querySelector('.comments-showed');
const commentCounterElement = bigPictureElement.querySelector('.social__comment-count');


const createCommentNodeElement = (comment) => {
  const commentNodeElement = commentTemplate.cloneNode(true);
  const imgElement = commentNodeElement.querySelector('.social__picture');
  imgElement.src = comment.avatar;
  imgElement.alt = comment.name;
  commentNodeElement.querySelector('.social__text').textContent = comment.message;
  return commentNodeElement;
};

const showLoadMoreButton = () => {
  commentsLoadButtonElement.classList.remove('hidden');
};

const hideLoadMoreButton = () => {
  commentsLoadButtonElement.classList.add('hidden');
};

const setCounterNumber = (number) => {
  showedCommentsCounterElement.textContent = number.toString();
};

const hideCommentsCounter = () => {
  commentCounterElement.classList.add('hidden');
};

const showCommentsCounter = () => {
  commentCounterElement.classList.remove('hidden');
};

const clearCommentsList = () => {
  const commentsCollection = document.querySelectorAll('.social__comment');
  for (let i = commentsCollection.length - 1; i >= 0; i--) {
    commentsCollection[i].remove();
  }
};

const onCommentsLoadButtonClicked = () => {
  const commentShowed = Number(showedCommentsCounterElement.textContent);
  const commentsCollection = document.querySelectorAll('.social__comment');
  const commentCount = (commentsCollection.length < commentShowed + COUNT_OF_LOADED_COMMENTS) ? commentsCollection.length : commentShowed + COUNT_OF_LOADED_COMMENTS;

  for (let i = commentShowed; i < commentCount; i++) {
    commentsCollection[i].classList.remove('hidden');
  }

  setCounterNumber(commentCount);
  if (commentCount === commentsCollection.length) {
    hideLoadMoreButton();
  }
};

const renderComments = (commentsArray) => {
  commentsArray.forEach((comment, index) => {
    const commentNodeElement = createCommentNodeElement(comment);
    if (index > COUNT_OF_LOADED_COMMENTS - 1) {
      commentNodeElement.classList.add('hidden');
    }
    commentsListFragment.appendChild(commentNodeElement);
  });
  commentsListElement.appendChild(commentsListFragment);

  if (commentsArray.length <= COUNT_OF_LOADED_COMMENTS) {
    hideCommentsCounter();
    hideLoadMoreButton();
  } else {
    showLoadMoreButton();
    showCommentsCounter();
    setCounterNumber(COUNT_OF_LOADED_COMMENTS);
  }

  commentsLoadButtonElement.addEventListener('click', onCommentsLoadButtonClicked);
};

export {
  renderComments,
  clearCommentsList,
  onCommentsLoadButtonClicked,
};

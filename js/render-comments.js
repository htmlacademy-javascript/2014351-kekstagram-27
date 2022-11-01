import {COUNT_OF_LOADED_COMMENTS} from './config.js';

const template = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const bigPicture = document.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsListFragment = document.createDocumentFragment();
const commentsLoadButton = bigPicture.querySelector('.comments-loader');
const showedCommentsCounter = bigPicture.querySelector('.comments-showed');
const commentCounter = bigPicture.querySelector('.social__comment-count');


const createCommentNodeElement = (comment) => {
  const commentNodeElement = template.cloneNode(true);
  const img = commentNodeElement.querySelector('.social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  commentNodeElement.querySelector('.social__text').textContent = comment.message;
  return commentNodeElement;
};

const showLoadMoreButton = () => {
  commentsLoadButton.classList.remove('hidden');
};

const hideLoadMoreButton = () => {
  commentsLoadButton.classList.add('hidden');
};

const setCounterNumber = (number) => {
  showedCommentsCounter.textContent = number.toString();
};

const hideCommentsCounter = () => {
  commentCounter.classList.add('hidden');
};

const showCommentsCounter = () => {
  commentCounter.classList.remove('hidden');
};

const clearCommentsList = () => {
  const commentsCollection = document.querySelectorAll('.social__comment');
  for (let i = commentsCollection.length - 1; i >= 0; i--) {
    commentsCollection[i].remove();
  }
};

const onCommentsLoadButtonClicked = () => {
  const commentShowed = Number(showedCommentsCounter.textContent);
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
  commentsList.appendChild(commentsListFragment);

  if (commentsArray.length <= COUNT_OF_LOADED_COMMENTS) {
    hideCommentsCounter();
    hideLoadMoreButton();
  } else {
    showLoadMoreButton();
    showCommentsCounter();
    setCounterNumber(COUNT_OF_LOADED_COMMENTS);
  }

  commentsLoadButton.addEventListener('click', onCommentsLoadButtonClicked);
};

export {
  renderComments,
  clearCommentsList,
  onCommentsLoadButtonClicked,
};

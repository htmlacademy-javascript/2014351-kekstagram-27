const bigPicture = document.querySelector('.big-picture');
const template = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const commentsList = bigPicture.querySelector('.social__comments');
const commentsListFragment = document.createDocumentFragment();

const clearCommentsList = () => {
  const commentsCollection = commentsList.children;
  for (let i = commentsCollection.length - 1; i >= 0; i--) {
    commentsCollection[i].remove();
  }
};

const renderDetail = (photo) => {
  bigPicture.querySelector('.big-picture__img').children[0].src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = String(photo.likes);
  bigPicture.querySelector('.comments-count').textContent = String(photo.comments.length);
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  clearCommentsList();
  photo.comments.forEach((comment) => {
    const commentItemTemplate = template.cloneNode(true);
    const img = commentItemTemplate.querySelector('.social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    commentItemTemplate.querySelector('.social__text').textContent = comment.message;
    commentsListFragment.appendChild(commentItemTemplate);
  });
  commentsList.appendChild(commentsListFragment);

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  bigPicture.classList.remove('hidden');

  if (!document.body.classList.contains('modal-open')) {
    document.body.classList.add('modal-open');
  }
};

export {
  renderDetail,
  bigPicture
};


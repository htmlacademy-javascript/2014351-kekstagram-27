import {NOTIFICATION_TIME} from './config.js';

const createModal = (type) => {
  const modal = document.querySelector(`#${type}`)
    .content
    .querySelector(`.${type}`)
    .cloneNode(true);

  const modalCloseButton = modal.querySelector(`.${type}__button`);

  const onEscapeDown = (evt) => {
    if (evt.key === 'Escape') {
      modal.remove();
      removeEventListeners();
    }
  };

  const onMouseClick = (evt) => {
    if (evt.target.tagName === 'SECTION' && evt.target.classList.contains(type)) {
      modal.remove();
      removeEventListeners();
    }
  };

  document.addEventListener('keydown', onEscapeDown);
  document.addEventListener('click', onMouseClick);
  modalCloseButton.addEventListener('click', () => {
    modal.remove();
    removeEventListeners();
  });

  // linter fix no-use-before-define
  function removeEventListeners() {
    document.removeEventListener('keydown', onEscapeDown);
    document.removeEventListener('click', onMouseClick);
  }

  return modal;
};

const showSuccessModal = () => {
  const modal = createModal('success');
  document.body.appendChild(modal);
};

const showErrorModal = () => {
  const modal = createModal('error');
  document.body.appendChild(modal);
};

const showErrorNotify = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert');


  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, NOTIFICATION_TIME);
};

export {
  showSuccessModal,
  showErrorModal,
  showErrorNotify
};

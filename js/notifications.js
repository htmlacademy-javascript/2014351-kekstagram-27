import {NOTIFICATION_TIME} from './config.js';

const createModal = (type) => {
  const modalElement = document.querySelector(`#${type}`)
    .content
    .querySelector(`.${type}`)
    .cloneNode(true);

  const modalCloseButtonElement = modalElement.querySelector(`.${type}__button`);

  const onEscapeDown = (evt) => {
    if (evt.key === 'Escape') {
      modalElement.remove();
      removeEventListeners();
    }
  };

  const onMouseClick = (evt) => {
    if (evt.target.tagName === 'SECTION' && evt.target.classList.contains(type)) {
      modalElement.remove();
      removeEventListeners();
    }
  };

  document.addEventListener('keydown', onEscapeDown);
  document.addEventListener('click', onMouseClick);
  modalCloseButtonElement.addEventListener('click', () => {
    modalElement.remove();
    removeEventListeners();
  });

  // linter fix no-use-before-define
  function removeEventListeners() {
    document.removeEventListener('keydown', onEscapeDown);
    document.removeEventListener('click', onMouseClick);
  }

  return modalElement;
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
  const alertElement = document.createElement('div');
  alertElement.classList.add('alert');

  alertElement.textContent = message;

  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, NOTIFICATION_TIME);
};

export {
  showSuccessModal,
  showErrorModal,
  showErrorNotify
};

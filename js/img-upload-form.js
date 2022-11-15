import {FILE_TYPES, MAX_SCALE, MIN_SCALE, SCALE_STEP} from './config.js';
import {destroySlider, initSlider} from './effects-slider.js';
import {pristine} from './form-validation.js';
import {postNewPhoto} from './api/photos-api.js';
import {showErrorModal, showSuccessModal} from './notifications.js';

const uploadFormElement = document.querySelector('#upload-select-image');
const uploadInputElement = uploadFormElement.querySelector('#upload-file');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');
const hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');
const commentInputElement = uploadFormElement.querySelector('.text__description');
const uploadFormButtonCloseElement = uploadFormElement.querySelector('.img-upload__cancel');
const [scaleButtonSmallerElement, scaleControlElement, scaleButtonBiggerElement] = uploadFormElement.querySelector('.img-upload__scale').children;
const imgPreviewElement = uploadFormElement.querySelector('.img-upload__preview').children[0];
const effectsListElement = uploadFormElement.querySelector('.effects__list');

const toggleUploadForm = () => {
  uploadFormElement.querySelector('.img-upload__overlay').classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};

const disableUploadButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикуется...';
};

const enableUploadButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const changeScale = (value) => {
  let scale = Number(scaleControlElement.value.replace('%', '')) + value;
  scale = (scale < MIN_SCALE) ? MIN_SCALE : scale;
  scale = (scale > MAX_SCALE) ? MAX_SCALE : scale;
  scaleControlElement.value = `${scale}%`;
  imgPreviewElement.style.transform = `scale(${scale / 100})`;
};

const clearUploadForm = () => {
  uploadInputElement.value = '';
  uploadFormElement.querySelector('#effect-none').click();
  hashtagInputElement.value = '';
  commentInputElement.value = '';
  changeScale(MAX_SCALE);
};

const removeEffects = () => {
  effectsListElement
    .querySelectorAll('.effects__radio')
    .forEach((effect) => {
      imgPreviewElement.classList.remove(`effects__preview--${effect.value}`);
    });
};

const onEscapeDown = (evt) => {
  if (evt.key === 'Escape' && hashtagInputElement !== document.activeElement && commentInputElement !== document.activeElement) {
    toggleUploadForm();
    clearUploadForm();
    destroySlider();
    document.removeEventListener('keydown', onEscapeDown);
  }
};

const renderPreview = () => {
  const file = uploadInputElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgPreviewElement.src = URL.createObjectURL(file);
  }
};

const initUploadForm = () => {
  effectsListElement.addEventListener('click', (evt) => {
    if (evt.target.nodeName === 'INPUT') {
      removeEffects();
      imgPreviewElement.classList.add(`effects__preview--${evt.target.value}`);
    }
  });

  uploadFormButtonCloseElement.addEventListener('click', () => {
    toggleUploadForm();
    clearUploadForm();
    document.removeEventListener('keydown', onEscapeDown);
    destroySlider();
  });

  uploadInputElement.addEventListener('change', () => {
    renderPreview();
    toggleUploadForm();
    initSlider();
    document.addEventListener('keydown', onEscapeDown);
  });

  scaleButtonBiggerElement.addEventListener('click', () => {
    changeScale(SCALE_STEP);
  });

  scaleButtonSmallerElement.addEventListener('click', () => {
    changeScale(-SCALE_STEP);
  });

  uploadFormElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (!isValid) {
      return false;
    }
    disableUploadButton();
    try {
      const response = await postNewPhoto(evt.target);
      if (!response.ok) {
        throw new Error('Произошла ошибка');
      }

      toggleUploadForm();
      clearUploadForm();
      destroySlider();
      document.removeEventListener('keydown', onEscapeDown);

      showSuccessModal();
    } catch (err) {
      showErrorModal();
    } finally {
      enableUploadButton();
    }
  });
};

export {
  initUploadForm,
  changeScale
};

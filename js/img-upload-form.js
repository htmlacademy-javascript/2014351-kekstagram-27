import {MAX_SCALE, MIN_SCALE, SCALE_STEP} from './config.js';
import {destroySlider, initSlider} from './effects-slider.js';
import {pristine} from './form-validation.js';

const uploadForm = document.querySelector('#upload-select-image');
const uploadInput = uploadForm.querySelector('#upload-file');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const uploadFormButtonClose = uploadForm.querySelector('.img-upload__cancel');
const [scaleButtonSmaller, scaleControl, scaleButtonBigger] = uploadForm.querySelector('.img-upload__scale').children;
const imgPreview = uploadForm.querySelector('.img-upload__preview').children[0];
const effectsList = uploadForm.querySelector('.effects__list');

const toggleUploadForm = () => {
  uploadForm.querySelector('.img-upload__overlay').classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};

const changeScale = (value) => {
  let scale = Number(scaleControl.value.replace('%', '')) + value;
  scale = (scale < MIN_SCALE) ? MIN_SCALE : scale;
  scale = (scale > MAX_SCALE) ? MAX_SCALE : scale;
  scaleControl.value = `${scale}%`;
  imgPreview.style = `transform: scale(${scale / 100})`;
};

const clearUploadForm = () => {
  uploadInput.value = '';
  uploadForm.querySelector('#effect-none').click();
  hashtagInput.value = '';
  commentInput.value = '';
  changeScale(MAX_SCALE);
};

const removeEffects = () => {
  effectsList
    .querySelectorAll('.effects__radio')
    .forEach((effect) => {
      imgPreview.classList.remove(`effects__preview--${effect.value}`);
    });
};

const onEscapeDown = (evt) => {
  if (evt.key === 'Escape' && hashtagInput !== document.activeElement && commentInput !== document.activeElement) {
    toggleUploadForm();
    clearUploadForm();
    destroySlider();
    document.removeEventListener('keydown', onEscapeDown);
  }
};

const initUploadForm = () => {
  effectsList.addEventListener('click', (evt) => {
    if (evt.target.nodeName === 'INPUT') {
      removeEffects();
      imgPreview.classList.add(`effects__preview--${evt.target.value}`);
    }
  });

  uploadFormButtonClose.addEventListener('click', () => {
    toggleUploadForm();
    clearUploadForm();
    document.removeEventListener('keydown', onEscapeDown);
    destroySlider();
  });

  uploadInput.addEventListener('change', () => {
    toggleUploadForm();
    initSlider();
    document.addEventListener('keydown', onEscapeDown);
  });

  scaleButtonBigger.addEventListener('click', () => {
    changeScale(SCALE_STEP);
  });

  scaleButtonSmaller.addEventListener('click', () => {
    changeScale(-SCALE_STEP);
  });

  uploadForm.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });
};

export {initUploadForm};

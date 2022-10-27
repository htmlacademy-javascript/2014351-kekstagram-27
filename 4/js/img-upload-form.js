import {checkArrayHasNoDuplicates, validateMaxStringLength} from './utils.js';
import {MAX_COMMENT_LENGTH, MAX_HASHTAG_COUNT, MAX_HASHTAG_LENGTH, MAX_SCALE, MIN_SCALE, SCALE_STEP} from './config.js';

const uploadForm = document.querySelector('#upload-select-image');
const uploadInput = uploadForm.querySelector('#upload-file');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const uploadFormButtonClose = uploadForm.querySelector('.img-upload__cancel');
const [scaleButtonSmaller, scaleControl, scaleButtonBigger] = uploadForm.querySelector('.img-upload__scale').children;
const imgPreview = uploadForm.querySelector('.img-upload__preview').children[0];
const effectsList = uploadForm.querySelector('.effects__list');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text__error',
  errorTextTag: 'p',
});

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
  });

  uploadInput.addEventListener('change', () => {
    toggleUploadForm();
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

const validateHashtagsSymbols = (value) => {
  const regexp = /^#[a-zA-Z\d\u0401\u0451\u0410-\u044f]+$/;
  const hashtagsArray = value.trim().split(' ');
  if (value === '') {
    return true;
  }
  return hashtagsArray.every((hashtag) => regexp.test(hashtag));
};

const validateHashtagsLength = (value) => {
  const hashtagsArray = value.trim().split(' ');
  return hashtagsArray.every((hashtag) => validateMaxStringLength(hashtag, MAX_HASHTAG_LENGTH));
};

const validateHashtagsNoDuplicates = (value) => {
  const hashtagsArray = value.trim().split(' ');
  return checkArrayHasNoDuplicates(hashtagsArray);
};

const validateHashtagsCount = (value) => {
  const hashtagsArray = value.trim().split(' ');
  return hashtagsArray.length <= MAX_HASHTAG_COUNT;
};

const validateComment = (comment) => validateMaxStringLength(comment, MAX_COMMENT_LENGTH);

pristine.addValidator(
  hashtagInput,
  validateHashtagsSymbols,
  'Хэштег должен начинаться с #, состоять из букв и цифр'
);

pristine.addValidator(
  hashtagInput,
  validateHashtagsNoDuplicates,
  'Хэштеги не должны повторяться!'
);

pristine.addValidator(
  hashtagInput,
  validateHashtagsCount,
  `Не более ${MAX_HASHTAG_COUNT} хэштегов`
);

pristine.addValidator(
  hashtagInput,
  validateHashtagsLength,
  `Длина хэштега не более ${MAX_HASHTAG_LENGTH} знаков`
);

pristine.addValidator(
  commentInput,
  validateComment,
  `Не более ${MAX_COMMENT_LENGTH} символов`
);

export {initUploadForm};

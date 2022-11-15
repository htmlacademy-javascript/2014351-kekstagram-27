import {checkArrayHasNoDuplicates, validateMaxStringLength} from './utils.js';
import {MAX_COMMENT_LENGTH, MAX_HASHTAG_COUNT, MAX_HASHTAG_LENGTH} from './config.js';

const uploadFormElement = document.querySelector('#upload-select-image');
const hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');
const commentInputElement = uploadFormElement.querySelector('.text__description');


const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text__error',
  errorTextTag: 'p',
});

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

const initValidator = () => {
  pristine.addValidator(
    hashtagInputElement ,
    validateHashtagsSymbols,
    'Хэштег должен начинаться с #, состоять из букв и цифр'
  );

  pristine.addValidator(
    hashtagInputElement ,
    validateHashtagsNoDuplicates,
    'Хэштеги не должны повторяться!'
  );

  pristine.addValidator(
    hashtagInputElement ,
    validateHashtagsCount,
    `Не более ${MAX_HASHTAG_COUNT} хэштегов`
  );

  pristine.addValidator(
    hashtagInputElement ,
    validateHashtagsLength,
    `Длина хэштега не более ${MAX_HASHTAG_LENGTH} знаков`
  );

  pristine.addValidator(
    commentInputElement,
    validateComment,
    `Не более ${MAX_COMMENT_LENGTH} символов`
  );
};

export {
  pristine,
  initValidator,
};

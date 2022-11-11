const AVATAR_COUNT = 6;

const PHOTOS_COUNT = 25;

const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;

const LIKES_RANGE_FROM = 15;
const LIKES_RANGE_TO = 200;

const COMMENTS_RANGE_FROM = 2;
const COMMENTS_RANGE_TO = 20;

const COUNT_OF_LOADED_COMMENTS = 5;

const EFFECTS_CONFIG = {
  chrome: {
    slider: {
      range: {min: 0, max: 1},
      start: 1,
      step: 0.1,
    },
    filter: 'grayscale',
    unit: '',
  },
  sepia: {
    slider: {
      range: {min: 0, max: 1},
      start: 1,
      step: 0.1,
    },
    filter: 'sepia',
    unit: '',
  },
  marvin: {
    slider: {
      range: {min: 0, max: 100},
      start: 100,
      step: 1,
    },
    filter: 'invert',
    unit: '%',
  },
  phobos: {
    slider: {
      range: {min: 0, max: 3},
      start: 3,
      step: 0.1,
    },
    filter: 'blur',
    unit: 'px',
  },
  heat: {
    slider: {
      range: {min: 1, max: 3},
      start: 3,
      step: 0.1,
    },
    filter: 'brightness',
    unit: '',
  },
  default: {
    slider: {
      range: {min: 0, max: 100},
      start: 100,
      step: 1,
    },
    filter: '',
    unit: '',
  }
};

const NOTIFICATION_TIME = 5000;

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

export {
  AVATAR_COUNT,
  MAX_SCALE,
  MIN_SCALE,
  SCALE_STEP,
  MAX_COMMENT_LENGTH,
  MAX_HASHTAG_LENGTH,
  MAX_HASHTAG_COUNT,
  PHOTOS_COUNT,
  LIKES_RANGE_TO,
  LIKES_RANGE_FROM,
  COUNT_OF_LOADED_COMMENTS,
  COMMENTS_RANGE_TO,
  COMMENTS_RANGE_FROM,
  EFFECTS_CONFIG,
  NOTIFICATION_TIME,
  FILE_TYPES
};

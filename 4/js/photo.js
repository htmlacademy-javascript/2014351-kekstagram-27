import {createIdGenerator, getRandomInteger} from './utils.js';
import {generateCommentsArray} from './comment.js';
import {LIKES_RANGE_FROM, LIKES_RANGE_TO} from './config.js';

const ADJECTIVES = [
  'beautiful',
  'wonderful',
  'sweet',
  'impossible',
  'creative',
  'sexy',
];

const NOUNS = [
  'cat',
  'place',
  'trip',
  'human',
  'food',
  'girl',
];

const generateDescription = (array1, array2) => `${array1[getRandomInteger(0, array1.length - 1)]} ${array2[getRandomInteger(0, array2.length - 1)]}`;


const generatePhoto = (id) => ({
  id,
  url:`photos/${id}.jpg`,
  description: generateDescription(ADJECTIVES, NOUNS),
  likes: getRandomInteger(LIKES_RANGE_FROM, LIKES_RANGE_TO),
  comments: generateCommentsArray(3),
});


const generatePhotosArray = (count) => {
  const generateId = createIdGenerator();
  return Array.from({length: count}, () => generatePhoto(generateId()));
};

export {
  generatePhotosArray
};

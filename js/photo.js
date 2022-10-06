import {getRandomInteger} from './utils.js';
import {generateCommentsArray} from './comment.js';

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

function generatePhotosArray(count) {
  return Array.from({length: count}, (el, index) => generatePhoto(index + 1));
}

function generatePhoto(id) {
  return {
    id,
    url:`photos/${id}.jpg`,
    description: generateDescription(ADJECTIVES, NOUNS),
    likes: getRandomInteger(15, 200),
    comments: generateCommentsArray(3),
  };
}

function generateDescription(array1, array2) {
  return `${array1[getRandomInteger(0, array1.length - 1)]} ${array2[getRandomInteger(0, array2.length - 1)]}`;
}

export {
  generatePhotosArray
};

import {createRandomIdFromRangeGenerator, getRandomInteger} from './utils.js';
import {AVATAR_COUNT} from './config.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Епифан',
  'Давид',
  'Аристотель',
  'Тони',
];

const generateMessage = (count) =>
  Array.from({length: count}).reduce((message, _, index) => {
    message += MESSAGES[getRandomInteger(0, MESSAGES.length - 1)];
    message += (index === count - 1) ? '' : ' ';
    return message;
  }, '');


const generateComment = (id) => ({
  id: id,
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: generateMessage(getRandomInteger(1, 2)),
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
});


const generateCommentsArray = (min, max) => {
  const generateRandomId = createRandomIdFromRangeGenerator(1, max * 10);
  return Array.from({length: getRandomInteger(min, max)}, () => generateComment(generateRandomId()));
};

export {
  generateCommentsArray
};

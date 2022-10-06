import {getRandomInteger} from './utils.js';

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

let idCounter = 1;

function generateCommentsArray(max) {
  return Array.from({length: getRandomInteger(1, max)}, () => generateComment());
}

function generateComment() {
  return {
    id: idCounter++,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: generateMessage(getRandomInteger(1, 2)),
    name: NAMES[getRandomInteger(0, NAMES.length - 1)],
  };
}

function generateMessage(count) {
  return Array.from({length: count}).reduce((message, _, index) => {
    message += MESSAGES[getRandomInteger(0, MESSAGES.length - 1)];
    message += (index === count - 1) ? '' : ' ';
    return message;
  }, '');
}

export {
  generateCommentsArray
};

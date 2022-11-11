const getRandomInteger = (min, max) => {
  if (min >= 0 && max >= 0 && min !== max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  return NaN;
};

const validateMaxStringLength = (string, maxLength) => string.length <= maxLength;


const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return function() {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const randomValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (randomValues.length >= (max - min + 1)) {
      return null;
    }
    while (randomValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    randomValues.push(currentValue);
    return currentValue;
  };
};

const createRandomIntegersArrayFromRange = (min, max, count) => {
  const generate = createRandomIdFromRangeGenerator(min, max);
  const result = [];
  for (let i = 1; i <= count; i++) {
    result.push(generate());
  }
  return result;
};

const checkArrayHasNoDuplicates = (array) => {
  let result = true;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[i].toLowerCase() === array[j].toLowerCase() && i !== j) {
        result = false;
        break;
      }
    }
    if (!result) {
      break;
    }
  }
  return result;
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  getRandomInteger,
  validateMaxStringLength,
  createRandomIdFromRangeGenerator,
  createIdGenerator,
  checkArrayHasNoDuplicates,
  createRandomIntegersArrayFromRange,
  debounce
};

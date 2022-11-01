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

export {
  getRandomInteger,
  validateMaxStringLength,
  createRandomIdFromRangeGenerator,
  createIdGenerator,
  checkArrayHasNoDuplicates,
};

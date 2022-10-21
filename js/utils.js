function getRandomInteger(min, max) {
  if (min >= 0 && max >= 0 && min !== max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  return NaN;
}

function validateMaxStringLength(string, maxLength) {
  return string.length <= maxLength;
}

function createIdGenerator() {
  let lastGeneratedId = 0;
  return function() {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

function createRandomIdFromRangeGenerator(min, max) {
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
}

export {
  getRandomInteger,
  validateMaxStringLength,
  createRandomIdFromRangeGenerator,
  createIdGenerator,
};

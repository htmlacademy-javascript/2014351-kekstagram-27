function getRandomInteger(min, max) {
  if (min >= 0 && max >= 0 && min !== max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  return NaN;
}

function validateMaxStringLength(string, maxLength) {
  return string.length <= maxLength;
}

export {
  getRandomInteger,
  validateMaxStringLength
};

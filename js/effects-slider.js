const uploadForm = document.querySelector('#upload-select-image');
const effectsSlider = uploadForm.querySelector('.effect-level');
const sliderValue = effectsSlider.querySelector('.effect-level__value');
const effectsList = uploadForm.querySelector('.effects__list');
const imgPreview = uploadForm.querySelector('.img-upload__preview').children[0];

const onEffectChange = (evt) => {
  if (evt.target.value !== 'none') {
    effectsSlider.classList.remove('hidden');
  }

  switch (evt.target.value) {
    case 'chrome':
    case 'sepia':
      effectsSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;
    case 'marvin':
      effectsSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      break;
    case 'phobos':
      effectsSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
    case 'heat':
      effectsSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
    default:
      effectsSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      effectsSlider.classList.add('hidden');
  }
};

const initSlider = () => {
  noUiSlider.create(effectsSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  });

  effectsSlider.noUiSlider.on('update', () => {
    sliderValue.value = effectsSlider.noUiSlider.get();
    const selectedEffect = effectsList.querySelector('[name="effect"]:checked').value;
    let filter = '';
    let unit = '';
    switch (selectedEffect) {
      case 'chrome':
        filter = 'grayscale';
        break;
      case 'marvin':
        filter = 'invert';
        unit = '%';
        break;
      case 'sepia':
        filter = 'sepia';
        break;
      case 'phobos':
        filter = 'blur';
        unit = 'px';
        break;
      case 'heat':
        filter = 'brightness';
    }

    imgPreview.style = filter.length ? `filter: ${filter}(${sliderValue.value}${unit})` : '';
  });

  effectsList.addEventListener('change', onEffectChange);
};

const destroySlider = () => {
  effectsSlider.noUiSlider.destroy();
  effectsList.removeEventListener('change', onEffectChange);
};

export {
  initSlider,
  destroySlider,
};

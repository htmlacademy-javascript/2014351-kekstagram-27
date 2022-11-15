import {EFFECTS_CONFIG} from './config.js';

const uploadFormElement = document.querySelector('#upload-select-image');
const effectsSliderElement = uploadFormElement.querySelector('.effect-level');
const sliderInputElement = effectsSliderElement.querySelector('.effect-level__value');
const effectsListElement = uploadFormElement.querySelector('.effects__list');
const imgPreviewElement = uploadFormElement.querySelector('.img-upload__preview').children[0];

const showEffectsSlider = () => {
  effectsSliderElement.classList.remove('hidden');
};

const hideEffectsSlider = () => {
  effectsSliderElement.classList.add('hidden');
};

const onEffectChange = (evt) => {
  const effect = evt.target.value;

  // EFFECTS_CONFIG.hasOwnProperty(effect)
  if (Object.prototype.hasOwnProperty.call(EFFECTS_CONFIG, effect)) {
    effectsSliderElement.noUiSlider.updateOptions(EFFECTS_CONFIG[effect].slider);
    showEffectsSlider();
  } else {
    effectsSliderElement.noUiSlider.updateOptions(EFFECTS_CONFIG.default.slider);
    hideEffectsSlider();
  }
  // changeScale(MAX_SCALE);
};

const initSlider = () => {
  noUiSlider.create(effectsSliderElement, EFFECTS_CONFIG.default.slider);

  effectsSliderElement.noUiSlider.on('update', () => {
    const value = effectsSliderElement.noUiSlider.get();
    const selectedEffect = effectsListElement.querySelector('[name="effect"]:checked').value;

    // EFFECTS_CONFIG.hasOwnProperty(selectedEffect)
    if (Object.prototype.hasOwnProperty.call(EFFECTS_CONFIG, selectedEffect)) {
      const {filter, unit} = EFFECTS_CONFIG[selectedEffect];

      imgPreviewElement.style.filter = `${filter}(${value}${unit})`;
      sliderInputElement.value = value;
    } else {
      imgPreviewElement.style.filter = '';
      sliderInputElement.value = '';
    }
  });

  effectsListElement.addEventListener('change', onEffectChange);
};

const destroySlider = () => {
  effectsSliderElement.noUiSlider.destroy();
  effectsListElement.removeEventListener('change', onEffectChange);
};

export {
  initSlider,
  destroySlider,
};

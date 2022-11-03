import {EFFECTS_CONFIG} from './config.js';

const uploadForm = document.querySelector('#upload-select-image');
const effectsSlider = uploadForm.querySelector('.effect-level');
const sliderInput = effectsSlider.querySelector('.effect-level__value');
const effectsList = uploadForm.querySelector('.effects__list');
const imgPreview = uploadForm.querySelector('.img-upload__preview').children[0];

const showEffectsSlider = () => {
  effectsSlider.classList.remove('hidden');
};

const hideEffectsSlider = () => {
  effectsSlider.classList.add('hidden');
};

const onEffectChange = (evt) => {
  const effect = evt.target.value;

  // EFFECTS_CONFIG.hasOwnProperty(effect)
  if (Object.prototype.hasOwnProperty.call(EFFECTS_CONFIG, effect)) {
    effectsSlider.noUiSlider.updateOptions(EFFECTS_CONFIG[effect].slider);
    showEffectsSlider();
  } else {
    effectsSlider.noUiSlider.updateOptions(EFFECTS_CONFIG.default.slider);
    hideEffectsSlider();
  }
};

const initSlider = () => {
  noUiSlider.create(effectsSlider, EFFECTS_CONFIG.default.slider);

  effectsSlider.noUiSlider.on('update', () => {
    const value = effectsSlider.noUiSlider.get();
    const selectedEffect = effectsList.querySelector('[name="effect"]:checked').value;

    // EFFECTS_CONFIG.hasOwnProperty(selectedEffect)
    if (Object.prototype.hasOwnProperty.call(EFFECTS_CONFIG, selectedEffect)) {
      const {filter, unit} = EFFECTS_CONFIG[selectedEffect];

      imgPreview.style = `filter: ${filter}(${value}${unit})`;
      sliderInput.value = value;
    } else {
      imgPreview.style = '';
      sliderInput.value = '';
    }
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

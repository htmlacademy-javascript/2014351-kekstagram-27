import {photoList} from './photo-list.js';
import {initCloseBigPicture} from './render-photo-detail.js';
import {initUploadForm} from './img-upload-form.js';
import {initValidator} from './form-validation.js';
import {getPhotosArray} from './photos-api.js';
import {showErrorNotify} from './notifications.js';
import {initFilterButtons} from './photo-list-filters.js';

(async () => {
  try {
    const photosArray = await getPhotosArray();
    initFilterButtons(photosArray);
    photoList(photosArray);
    initCloseBigPicture();
    initUploadForm();
    initValidator();
  } catch {
    showErrorNotify('Произошла ошибка при загрузке данных');
  }
})();

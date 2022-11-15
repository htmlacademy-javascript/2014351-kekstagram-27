import {renderPhotoList} from './render-photo-list.js';
import {initCloseBigPicture} from './render-photo-detail.js';
import {initUploadForm} from './img-upload-form.js';
import {initValidator} from './form-validation.js';
import {getPhotosArray} from './api/photos-api.js';
import {showErrorNotify} from './notifications.js';
import {initFilterButtons} from './photo-list-filters.js';

(async () => {
  try {
    const photosArray = await getPhotosArray();
    initFilterButtons(photosArray);
    renderPhotoList(photosArray);
    initCloseBigPicture();
    initUploadForm();
    initValidator();
  } catch {
    showErrorNotify('Произошла ошибка при загрузке данных');
  }
})();

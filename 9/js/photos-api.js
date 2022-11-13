const getPhotosArray = async () => fetch('https://27.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json());

const postNewPhoto = (data) => {
  const formData = new FormData(data);

  return fetch('https://27.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: formData,
    },
  );
};

export {
  getPhotosArray,
  postNewPhoto
};

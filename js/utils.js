
export function resizeImage(frame, given) {

  const ratio = given.width / given.height;

  const actualWidth = ((frame.width / ratio) < frame.height)
    ? frame.width
    : frame.height * ratio;

  const actualHeight = ((frame.width / ratio) < frame.height)
    ? frame.width / ratio
    : frame.height;

  return {
    width: actualWidth,
    height: actualHeight
  };
}

export function loadImage(src) {
  return new Promise((resolve, reject) => {

    let timeout = null;

    const img = new Image();
    const TIMEOUT_DELAY = 8000;

    img.onload = () => {
      clearTimeout(timeout);
      resolve(img);
    };

    img.onerror = () => {
      clearTimeout(timeout);
      reject(new Error(`Loading of image [${src}] is aborted with error`));
    };

    timeout = setTimeout(() => {
      clearTimeout(timeout);

      img.src = ``;
      reject(new Error(`Loading timeout of image [${src}] is expired`));

    }, TIMEOUT_DELAY);

    img.src = src;
  });
}

export function loadImages(sources) {

  const images = [];

  sources.forEach((src) => {
    images.push(loadImage(src));
  });

  return Promise.all(images);
}

export function _loadImage(src, onLoadCompleted) {

  let timeout = null;

  const img = new Image();
  const TIMEOUT_DELAY = 5000;

  img.addEventListener(`load`, () => {
    clearTimeout(timeout);

    if (typeof onLoadCompleted === `function`) {
      onLoadCompleted(img);
    }
  });

  img.addEventListener(`error`, () => {
    clearTimeout(timeout);

    img.src = ``;

    if (typeof onLoadCompleted === `function`) {
      onLoadCompleted(img);
    }
  });

  timeout = setTimeout(() => {
    img.src = ``;
  }, TIMEOUT_DELAY);

  img.src = src;
}

export function _loadImages(srcArray, onLoadCompleted) {

  const imgs = [];

  let count = srcArray.length;

  srcArray.forEach((src, index) => {

    _loadImage(src, (img) => {

      imgs[index] = img;
      count--;

      if (!count && typeof onLoadCompleted === `function`) {
        onLoadCompleted(imgs);
      }
    });
  });
}


export function getScreenFromTemplate(htmContent) {

  const wrapper = document.createElement(`section`);

  wrapper.classList.add(`central`);
  wrapper.insertAdjacentHTML(`afterbegin`, htmContent);

  return wrapper;
}

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

export function loadImage(src, onLoadCompleted) {

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

    if (typeof onLoadCompleted === `function`) {
      onLoadCompleted();
    }
  });

  timeout = setTimeout(() => {
    img.src = ``;
  }, TIMEOUT_DELAY);

  img.src = src;
}

export function loadImages(srcArray, onLoadCompleted) {

  const imgs = [];

  let count = srcArray.length;

  srcArray.forEach((src, index) => {

    loadImage(src, (img) => {

      imgs[index] = img;
      count--;

      if (!count && typeof onLoadCompleted === `function`) {
        onLoadCompleted(imgs);
      }
    });
  });
}


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

  timeout = setTimeout(() => {
    img.src = ``;
  }, TIMEOUT_DELAY);

  img.src = src;
}

export function uploadImages(parent, width, height, onLoadCompleted) {

  const imgs = Array.from(parent.querySelectorAll(`img`))
    .filter((img) => img.hasAttribute(`data-src`));

  let imgsCount = imgs.length;


  imgs.forEach((img) => loadImage(img.dataset.src, (image) => {

    const actual = resizeImage({width, height}, {
      width: image.naturalWidth,
      height: image.naturalHeight
    });

    image.width = actual.width;
    image.height = actual.height;

    image.alt = img.alt;

    img.parentNode.replaceChild(image, img);

    if (--imgsCount === 0 && typeof onLoadCompleted === `function`) {
      onLoadCompleted();
    }
  }));
}

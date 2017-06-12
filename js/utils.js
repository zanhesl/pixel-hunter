
export function getScreenFromTemplate(htmContent) {

  const wrapper = document.createElement(`section`);

  wrapper.classList.add(`central`);
  wrapper.insertAdjacentHTML(`afterbegin`, htmContent);

  return wrapper;
}

export function scaleImage(img, width, height) {

  const imgHeight = img.naturalHeight;
  const imgWidth = img.naturalWidth;

  const ratio = imgWidth / imgHeight;

  img.width = ((width / ratio) < height) ? width : height * ratio;
  img.height = ((width / ratio) < height) ? width / ratio : height;

  // console.log(`Image '${img.src}' ${imgWidth}:${imgHeight}(${imgWidth/imgHeight})`);
  // console.log(`${img.width}:${img.height}(${img.width/img.height}) in ${width}:${height}(${width/height})`);
}

export function loadImage(src, onLoadCompleted) {

  let timeout = null;

  const img = new Image(),
    TIMEOUT_DELAY = 5000;

  img.addEventListener(`load`, () => {
    clearTimeout(timeout);

    if (typeof onLoadCompleted === `function`) {
      onLoadCompleted(img);
    }
  });

  timeout = setTimeout(() => img.src = ``, TIMEOUT_DELAY);

  img.src = src;
}

export function uploadImages(parent, width, height, onLoadCompleted) {

  const imgs = Array.from(parent.querySelectorAll(`img`))
    .filter((img) => img.hasAttribute(`data-src`));

  let imgsCount = imgs.length;


  imgs.forEach((img) => loadImage(img.dataset.src, (image) => {

    scaleImage(image, width, height);

    image.alt = img.alt;

    img.parentNode.replaceChild(image, img);

    if (--imgsCount === 0 && typeof onLoadCompleted === `function`) {
      onLoadCompleted();
    }
  }));
}

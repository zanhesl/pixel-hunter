
export function getScreenFromTemplate(htmContent) {

  const wrapper = document.createElement(`section`);

  wrapper.classList.add(`central`);
  wrapper.insertAdjacentHTML(`afterbegin`, htmContent);

  return wrapper;
}


function scaleImage(img, width, height) {

  const imgHeight = img.naturalHeight;
  const imgWidth = img.naturalWidth;

  const ratio = imgWidth / imgHeight;

  img.width = ((width / ratio) < height) ? width : height * ratio;
  img.height = ((width / ratio) < height) ? width / ratio : height;

  // console.log(`Image upload ${imgWidth}:${imgHeight}(${imgWidth/imgHeight})`);
  // console.log(`${img.width}:${img.height}(${img.width/img.height}) in ${width}:${height}(${width/height})`);
}

function loadImage(src, width, height, callback) {

  let imageLoadTimeout = null;


  const image = new Image();

  image.addEventListener(`load`, () => {
    clearTimeout(imageLoadTimeout);

    scaleImage(image, width, height);

    callback(image);
  });

  image.addEventListener(`error`, () => {
    // console.log(`Unable upload image: ${src}`);
  });


  const LOAD_TIMEOUT = 5000;

  imageLoadTimeout = setTimeout(() => {
    image.src = ``;
  }, LOAD_TIMEOUT);


  image.src = src;
}


export function loadImages(parent, width, height) {

  const images = parent.querySelectorAll(`img`);

  Array.from(images).forEach((img) => {

    loadImage(img.dataset.src, width, height, (image) => {

      image.alt = img.alt;
      img.parentNode.replaceChild(image, img);
    });
  });
}

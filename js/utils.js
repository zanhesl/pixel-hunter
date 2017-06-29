
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
    const LOAD_TIMEOUT = 10000;

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

    }, LOAD_TIMEOUT);

    img.src = src;
  });
}

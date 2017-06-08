
export function getScreenFromTemplate(htmContent) {

  const wrapper = document.createElement(`section`);

  wrapper.classList.add(`central`);
  wrapper.insertAdjacentHTML(`afterbegin`, htmContent);

  return wrapper;
}

export function geElementFromTemplate(htmContent) {

  const wrapper = document.createElement(`template`);

  wrapper.innerHTML = htmContent;

  return wrapper.content;
}



export function getScreenFromTemplate(htmContent) {

  const wrapper = document.createElement(`section`);

  wrapper.classList.add(`central`);
  wrapper.insertAdjacentHTML(`afterbegin`, htmContent);

  return wrapper;
}

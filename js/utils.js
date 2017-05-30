
export function getElementFromTemplate(htmContent, wrapper) {

  wrapper = (wrapper) ? wrapper : document.createElement(`div`);

  wrapper.insertAdjacentHTML(`afterbegin`, htmContent);

  return wrapper;
}

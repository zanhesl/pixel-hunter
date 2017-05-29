
export function getElementFromTemplate(htmContent) {

  const parent = document.createElement(`section`);

  parent.classList.add(`central`);

  parent.insertAdjacentHTML(`afterbegin`, htmContent);

  return parent;
}

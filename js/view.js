
export default class AbstractView {

  get element() {

    if (!this._element) {
      this._element = this.render();
      this.bind();
    }

    return this._element;
  }

  get template() {
    throw new Error(`You have to define template for view`);
  }

  render() {

    const screen = document.createElement(`section`);

    screen.classList.add(`central`);
    screen.insertAdjacentHTML(`afterbegin`, this.template);

    return screen;
  }

  show(parentNode) {
    parentNode.appendChild(this.element);
  }

  remove() {
    this.element.parentNode.removeChild(this.element);
  }

  bind() {

  }
}

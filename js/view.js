
export default class AbstractView {

  get template() {
    throw new Error(`You have to define template for view`);
  }

  render() {

    const screen = document.createElement(`section`);

    screen.classList.add(`central`);
    screen.insertAdjacentHTML(`afterbegin`, this.template);

    return screen;
  }

  bind() {

  }

  get element() {

    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
}

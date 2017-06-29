
import AbstractView from '../view';
import footer from '../footer';


export default class ConfirmView extends AbstractView {
  constructor() {
    super();

    this._onConfirmFormClickHandler = this._onConfirmFormClickHandler.bind(this);
  }

  get template() {
    return `\
      <div class="confirm">
        <div class="confirm__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
        <h1 class="confirm__asterisk">*</h1>
        <div class="confirm__challenge">
          <h3>Вы действительно хотите завершить игру?</h3>
          <p>Покинув игру сейчас, вы потеряете результаты<br>
            всех пройденных уровней!</p>
        </div>
        <form class="confirm__form">
          <button class="confirm__button  confirm__button--ok" type="button">Покинуть игру...</button>
          <button class="confirm__button  confirm__button--cancel" type="button">Продолжить игру!</button>
        </form>
      </div>
      ${footer()}`;
  }

  _onConfirmFormClickHandler(evt) {
    evt.preventDefault();
    this.onConfirm(evt.target.classList.contains(`confirm__button--ok`));
  }

  remove() {
    this._confirmForm.removeEventListener(`click`, this._onConfirmFormClickHandler);
    super.remove();
  }

  bind() {
    this._confirmForm = this.element.querySelector(`.confirm__form`);

    this._confirmForm.addEventListener(`click`, this._onConfirmFormClickHandler);
  }

  onConfirm(result) {

  }
}

const keycodes = {
  isEnter: (keycode) => (keycode === 13),
  isEsc: (keycode) => (keycode === 30),
  isLeftArrow: (keycode) => (keycode === 37),
  isRightArrow: (keycode) => (keycode === 39),
};

export default keycodes;

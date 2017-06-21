
import * as utils from './../utils';


class Levels {
  constructor() {

    this.levels = [
      {
        type: 2,
        src: [`https://s-media-cache-ak0.pinimg.com/originals/e7/6d/05/e76d054b0124b31b6517a06bc13008a6.jpg`, `https://s-media-cache-ak0.pinimg.com/originals/b3/9f/51/b39f51fc34f71cde011c5b528b5072ff.jpg`, `https://s-media-cache-ak0.pinimg.com/736x/f5/a0/62/f5a0626a80fe6026c0ac65cdc2d8ede2.jpg`],
        options: [`photo`, `paint`, `photo`]
      }, {
        type: 0,
        src: [`https://ae01.alicdn.com/kf/HTB1KrnHQpXXXXcaaXXXq6xXFXXXv/Free-Shipping-Youthful-Pleasures-font-b-Pino-b-font-Portrait-font-b-Art-b-font-font.jpg`, `https://ae01.alicdn.com/kf/HTB1VwzZQpXXXXcYXFXXq6xXFXXXq/Free-Shipping-Remember-When-Pino-font-b-Portrait-b-font-Art-Print-World-font-b-Famous.jpg`],
        options: [`paint`, `paint`]
      }, {
        type: 1,
        src: [`https://s-media-cache-ak0.pinimg.com/564x/91/7f/ed/917fedf138470706f6b9439d77365824.jpg`],
        options: [`paint`]
      }, {
        type: 1,
        src: [`https://s-media-cache-ak0.pinimg.com/736x/fc/b1/cb/fcb1cb67683a85174f8b26d814647a7e--realistic-pencil-drawings-art-drawings.jpg`],
        options: [`paint`]
      }, {
        type: 1,
        src: [`https://s-media-cache-ak0.pinimg.com/originals/b3/fb/1d/b3fb1de46dfd8a7a884985d563067633.jpg`],
        options: [`paint`]
      }, {
        type: 2,
        src: [`https://s-media-cache-ak0.pinimg.com/originals/39/e9/b3/39e9b39628e745a39f900dc14ee4d9a7.jpg`, `http://twistedsifter.files.wordpress.com/2013/04/hyperrealistic-pencil-portraits-by-diegokoi-art-9.jpg?w=628&h=800`, `http://www.tuacahntech.com/uploads/6/1/7/9/6179841/6166205_orig.jpg`],
        options: [`photo`, `paint`, `photo`]
      }, {
        type: 1,
        src: [`https://s-media-cache-ak0.pinimg.com/736x/8f/b0/77/8fb077e97b62cfab2a4dec108ac7112f.jpg`],
        options: [`photo`]
      }, {
        type: 0,
        src: [`https://s-media-cache-ak0.pinimg.com/736x/d1/a6/64/d1a664bca214bf785a293cbc87950fc4.jpg`, `https://s-media-cache-ak0.pinimg.com/originals/c8/eb/70/c8eb703e1befb5fd79fe73dc28c3430e.jpg`],
        options: [`photo`, `paint`]
      }, {
        type: 1,
        src: [`https://s-media-cache-ak0.pinimg.com/736x/1f/98/75/1f9875f67944ca32526d1509841d8603.jpg`],
        options: [`paint`]
      }, {
        type: 3,
        src: [`https://s-media-cache-ak0.pinimg.com/736x/1f/98/75/1f9875f67944ca32526d1509841d8603.jpg`, `https://s-media-cache-ak0.pinimg.com/736x/9d/20/d5/9d20d5520494ca10aeaa29c3b259c78d.jpg`, `https://s-media-cache-ak0.pinimg.com/736x/1f/98/75/1f9875f67944ca32526d1509841d8603.jpg`],
        options: [`paint`, `photo`, `paint`]
      }
    ];
  }

  get count() {
    return this.levels.length;
  }

  load() {

    let count = this.levels.length;

    this.levels.forEach((level, index) => {

      utils.loadImages(level.src, (imgs) => {

        this.onProgress((1 - count / this.levels.length) * 100);

        this.levels[index].img = imgs;
        count--;

        if (!count) {
          this.onProgress(100);
          this.onLoad(this.levels);
        }
      });
    });
  }

  getLevel(index) {
    return this.levels[index];
  }

  onLoad(levels) {

  }

  onProgress(progress) {

  }
}

export default new Levels();

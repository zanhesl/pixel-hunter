
import {typeOptions} from './data';
import {loadImage} from '../utils';
import {DefaultAdapter} from '../adapter';


export default new class extends DefaultAdapter {

  preprocess(data) {

    const imageLoaders = [];

    data.forEach((item) => {

      item.formClass = typeOptions[item.type].formClass;
      item.hasAnswers = typeOptions[item.type].hasAnswers;

      item.answers.forEach((answer) => {

        imageLoaders.push(loadImage(answer.image.url)
          .then((img) => {
            answer.image.img = img;
          }));
      });
    });

    return Promise.all(imageLoaders).then(() => data);
  }

  toServer(data) {
    return data;
  }
}();

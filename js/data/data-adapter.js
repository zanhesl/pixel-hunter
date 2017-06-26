
import {typeOptions} from './data';
import {loadImage} from '../utils';
import {DefaultAdapter} from '../adapter';


export default new class extends DefaultAdapter {

  preprocess(data) {

    const imageLoaders = [];

    for (const item of data) {

      item.formClass = typeOptions[item.type].formClass;
      item.hasAnswers = typeOptions[item.type].hasAnswers;

      for (const answer of item.answers) {

        const loader = loadImage(answer.image.url).then((img) => {
          answer.image.img = img;
        });

        imageLoaders.push(loader);
      }
    }

    return Promise.all(imageLoaders).then(() => data);
  }

  toServer(data) {
    return data;
  }
}();

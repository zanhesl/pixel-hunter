
import defaultAdapter from './adapter';


export default class Model {
  get urlRead() {
    throw new Error(`Abstract method. Define the URL for model.`);
  }

  get urlWrite() {
    throw new Error(`Abstract method. Define the URL for model.`);
  }

  load(adapter = defaultAdapter) {
    return fetch(this.urlRead)
      .then((response) => response.json())
      .then(adapter.preprocess);
  }

  send(data, adapter = defaultAdapter) {

    const requestSettings = {
      body: adapter.toServer(data),
      headers: {'Content-Type': `application/json`},
      method: `POST`
    };

    return fetch(this.urlWrite, requestSettings)
      .then(this.onUpload);
  }
}


export class DefaultAdapter {
  constructor() {
    if (new.target === DefaultAdapter) {
      throw new Error(`Can't be instantiated with new DefaultAdapter`);
    }
  }

  preprocess(data) {
    return data;
  }

  toServer(data) {
    return data;
  }
}

export default new class extends DefaultAdapter {}();

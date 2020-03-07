import {action, observable} from 'mobx';

export default class HomeStore {
  @observable ethanol = 0;
  @observable gasoline = 0;
  @observable result = '';

  @action calculate = () => {
    const {ethanol, gasoline} = this;
    const ethanolNumber = Number(ethanol);
    const gasolineNumber = Number(gasoline);

    if (!isNaN(ethanolNumber) && !isNaN(gasolineNumber)) {
      const result = ethanolNumber / gasolineNumber;

      if (result > 0.7) {
        this.result = 'Vale a pena gasolina';
      } else if (result < 0.7) {
        this.result = 'Vale a pena etanol';
      } else {
        this.result = 'São equivalentes';
      }
    }
  };

  @action handleForm = input => {
    const key = Object.keys(input)[0];
    const value = input[key];
    this[key] = value;
  };
}

const homeStore = new HomeStore();

export {homeStore};

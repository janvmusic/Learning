import print from './print.js';

export const BurnerIndex = {
  UpperLeft: 0,
  UpperRight: 1,
  LowerLeft: 2,
  LowerRight: 3,
};

export default class Burner {
  constructor(id) {
    this.id = id;
    this.state = Burner.Off;
    this.vessel = null;
    print(`Created burner ${this.id} in Off state`});
  }

  on() {
    this.state = Burner.On;
    print(`Burner ${this.id} turned on!`);
  };

  off() {
    this.state = Burner.Off;
    print(`Burner ${this.id} turned off!`);
  };
};

Burner.Off = false;
Burner.On = true;

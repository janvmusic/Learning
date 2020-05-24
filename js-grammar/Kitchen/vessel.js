import print from './print.js';

export default class Vessel {
  constructor(material, type) {
    this.type = type;
    this.material = material;
    this.ingredients = [];

    print(`Created ${this.material} ${this.type}`);
  }

  calories() {
    const reducer = (acc, ing) => acc + ing.calories;
    let sum = this.ingredients.reduce(reducer, 0);
    print(`There are ${sum} calories in ${this.material} ${this.type}`);
  }

  add(ingredient) {
    this.ingredients.push(ingredient);
    print(`Added ${ingredient.name} to ${this.material} ${this.type}`);
  }

  cook() {
    console.log(`Cooking in ${this.material} ${this.type}`);
  }
}

class Pan extends Vessel {
  constructor(material) {
    super(material, "frying pan");
  }
};

class Pot extends Vessel {
  constructor(material) {
    super(material, "cooking pot");
  }
};

class Tray extends Vessel {
  constructor(material) {
    super(material, "baking tray");
  }
};

export { Vessel, Pan, Pot, Tray };

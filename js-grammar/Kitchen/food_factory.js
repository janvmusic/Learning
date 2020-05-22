import print from './print.js';
import Ingredient from './ingredient,js';

export default class FoodFactory {
  // Empty constructor
  // we wont be instantiating any objects here
  constructor() {};
};

// Here we will create food object instances
FoodFactory.make = function(ingredient) {
  return new Ingredient(ingredient.name, ingredient.type, ingredient.calories);
};


export detault class Fridge {
  constructor(ingredients {
    this.items = ingredients;
  };

  // get all ingredients of type
  get(type) {
    return this.items
      .filter(ingredient == ingredient.type == type, 0);
  };
};


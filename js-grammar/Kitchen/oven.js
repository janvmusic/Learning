class Oven {
  constructor() {
    this.tray = null;
  };

  add(tray) {
    this.tray = tray;
    print(`Tray with ${this.tray.ingredients} added`);
  };

  on() {
    print(`Oven turned on`);
  };

  off() {
    print(`Oven turned off`);
  };

  bake() {
    print("Oven bakes...");
  };
};

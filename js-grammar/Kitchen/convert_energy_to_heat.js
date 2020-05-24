import print from './print.js';
import { RangeType } from './range.js';

const convert_energy_to_heat = function(sourceType, minutes) {
  let energy = 0;

  // Prices less energy due to longer heating up to stage
  if (sourceType === RangeType.Electric) {
    energy = 1;
  }

  // Process more energy (more efficient)
  if (sourceType === RangeType.Gas) {
    energy = 2;
  }

  let energyGenerated = energy * minutes;
  print(`Range generated ${energyGenerated} unit(s) of energy`);
  return energyGenerated;
};

const convert = convert_energy_to_heat;

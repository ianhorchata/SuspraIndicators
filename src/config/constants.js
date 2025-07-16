// Global Constants and Reference Data
// These are fixed values used for calculations throughout the application

export const constants = {
  // Earth and Global Data
  earth: {
    totalArea: 510100000, // km²
    population: 8000000000, // 8 billion people (2023 estimate)
    totalLandArea: 148940000, // km²
    oceanArea: 369000000, // km²
    habitableLandArea: 107000000, // km²
    barrenLandArea: 34100000, // km²
    },
  percentages: {
    habitableLandForNature: 0.4, // 40% of habitable land is for nature
    habitableLandForPeople: 0.02, // 2% of habitable land is for people directly living on.
    habitableLandForAgriculture: 0.4, // 40% of habitable land is for agriculture
    habitableLandForEnergy: 0.18, // 18% of habitable land is for energy
    barrenLandForNature: 0.8, // 80% of barren land is for nature
    barrenLandForEnergy: 0.15, // 15% of barren land is for energy


  },
  energy: {
    solarIrradiance: 170, // W/m^2
    maxSolarEnergy: constants.energy.solarIrradiance * constants.earth.totalArea * 1000000, // if all of earth was covered in solar panels
    totalLandForEnergy: constants.earth.barrenLandArea * constants.percentages.barrenLandForEnergy + constants.earth.habitableLandArea * constants.percentages.habitableLandForEnergy, // km²
    solarPanelEfficiency: 0.2, // 20% efficiency
    totalEnergy: constants.energy.totalLandForEnergy * constants.energy.solarIrradiance * 1000000 * constants.energy.solarPanelEfficiency, // W
    energyPerPerson: constants.energy.totalEnergy / constants.earth.population, // W/person
    // if energy used > energy per person, score is negative. Energy used < energy per person, score is positive. 
    // Energy used = energy per person, score is 0.
    //easiest way energyPerPerson - energyUsed = watts excess
    //ig score should be based on number of people that can be supported.
    //If everyone was like you how many more/less people can be supported, say 1 is 1million people.
  },

}

/**
 * Get a constant value using dot notation
 * @param {string} path - Dot-separated path to the constant
 * @returns {any} The constant value
 */
export function getConstant(path) {
  return path.split('.').reduce((obj, key) => obj?.[key], constants)
}

// Export the main constants object for direct access
export default constants 
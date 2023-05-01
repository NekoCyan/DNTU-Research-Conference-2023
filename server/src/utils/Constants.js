/**
 * @typedef {Object} TravelPromptTypeDef
 * @property {string} destinationCountry Destination where to go.
 * @property {string} budget Budget for the travel.
 * @property {string} travelStyle Travel style.
 * @property {string} interestsNew Interests (Foods, Music, Historical...).
 * @property {string} accommodationType Accommodation type.
 * @property {string} transportationType Transportation type.
 * @property {string} activityType Activity type.
 * @property {string} cuisineType Cuisine type.
 * @property {string} tripDuration Trip duration.
 * @property {string} language Language.
 */

/**
 * 
 * @param {TravelPromptTypeDef} values 
 * @returns {string}
 */
exports.TravelPrompt = (values) =>
    `Generate a personalized travel itinerary for a trip to ${values.destinationCountry} with a budget of ${values.budget}. ` +
    `The traveler is interested in a ${values.travelStyle} vacation and enjoys ${values.interestsNew}. `+
    `They are looking for ${values.accommodationType} accommodations and prefer ${values.transportationType} transportation. `+
    `The itinerary should include ${values.activityType} activities and ${values.cuisineType} dining options. `+
    `Please provide a detailed itinerary with daily recommendations for ${values.tripDuration} days, including suggested destinations, activities, and dining options. `+
    `The itinerary should be written in ${values.language}.`;

exports.EMAIL_PATTERN = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;

exports.USERNAME_PATTERN = /^[a-z0-9]+$/;

exports.PASSWORD_PATTERN = /^[\u0000-\u007F]+$/;
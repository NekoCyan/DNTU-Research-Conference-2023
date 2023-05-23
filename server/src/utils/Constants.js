/**
 * @typedef {Object} TravelPromptOldTypeDef
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
 * @param {TravelPromptOldTypeDef} values 
 * @returns {string}
 */
exports.TravelPromptOld = (values) =>
    `Generate a personalized travel itinerary for a trip to ${values.destinationCountry} with a budget of ${values.budget}. ` +
    `The traveler is interested in a ${values.travelStyle} vacation and enjoys ${values.interestsNew}. ` +
    `They are looking for ${values.accommodationType} accommodations and prefer ${values.transportationType} transportation. ` +
    `The itinerary should include ${values.activityType} activities and ${values.cuisineType} dining options. ` +
    `Please provide a detailed itinerary with daily recommendations for ${values.tripDuration} days, including suggested destinations, activities, and dining options. ` +
    `The itinerary should be written in ${values.language}.`;

/**
 * @typedef {Object} TravelPromptTypeDef
 * @property {string} destination Destination where to go.
 * @property {string} budget Budget for the travel.
 * @property {number} duration Duration of the travel.
 * @property {Array<string>} interests Interests (Foods, Music, Historical...).
 * @property {string} accommodation Accommodation (Hotel, Hostel, Camping...).
 * @property {string} travelWith Travel with (Family, Friends, Alone...).
 * @property {string} moveByVehicle Move by vehicle (Car, Bus, Train, Plane...).
 * @property {Array<string>} activities Activities (Sightseeing, Shopping, Hiking...).
 * @property {Array<string>} cuisines Cuisines (Turkish, Italian, Chinese...).
 * @property {string} language Language (English, Vietnamese, ...).
 */

/**
 * 
 * @param {TravelPromptTypeDef} values 
 * @returns {string}
 */
exports.TravelPrompt = (values) =>
    `Generate a personalized travel itinerary for a trip to "${values.destination}" with a budget of ${values.budget} vnd. ` +
    `The traveler is enjoys ${values.interests.map(x => x).join(', ')}. ` +
    `They are looking for ${values.accommodation} accommodations and prefer ${values.moveByVehicle} for transportation and go with ${values.travelWith}. ` +
    `The itinerary should include ${values.activities.map(x => x).join(', ')} activities and ${values.cuisines.map(x => x).join(', ')} dining options. ` +
    `Please provide a detailed itinerary with daily recommendations for ${values.duration} day(s), including suggested destinations, activities, and dining options. ` +
    `The itinerary should be written in ${values.language}.` +
    `Write the planner as Markdown.`;

exports.TravelPromptForTemplate = `Generate a personalized travel itinerary for a trip to "{destination}" with a budget of {budget} vnd. ` +
    `The traveler is enjoys {interests}. ` +
    `They are looking for {accommodation} accommodations and prefer {moveByVehicle} for transportation and go with {travelWith}. ` +
    `The itinerary should include {activities} activities and {cuisines} dining options. ` +
    `Please provide a detailed itinerary with daily recommendations for {duration} day(s), including suggested destinations, activities, and dining options. ` +
    `The itinerary need to be written in {language}.` +
    `Write the planner as Markdown.`;

exports.TravelDetailsData = [
    {
        name: 'destination',
        required: true,
        type: 'string',
    }, {
        name: 'budget',
        required: true,
        type: 'string',
    }, {
        name: 'duration',
        required: true,
        type: 'number',
    }, {
        name: 'interests',
        required: true,
        type: 'array',
    }, {
        name: 'accommodation',
        required: true,
        type: 'string',
    }, {
        name: 'travelWith',
        required: true,
        type: 'string',
    }, {
        name: 'moveByVehicle',
        required: true,
        type: 'string',
    }, {
        name: 'activities',
        required: true,
        type: 'array',
    }, {
        name: 'cuisines',
        required: true,
        type: 'array',
    }, {
        name: 'language',
        required: true,
        type: 'string',
    },
];

exports.EMAIL_PATTERN = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;

exports.USERNAME_PATTERN = /^[a-z0-9]+$/;

exports.PASSWORD_PATTERN = /^[\u0000-\u007F]+$/;

exports.HEX_PATTERN = /^#[0-9a-fA-F]{3,6}$/;
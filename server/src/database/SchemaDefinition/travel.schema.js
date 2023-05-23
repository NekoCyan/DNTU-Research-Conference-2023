// travel.schema.js

/**
 * Travel Data.
 * @typedef {Object} TravelSchema
 * @property {string} userId User ID.
 * @property {string} travelId Travel ID (Will follow Date.now() timestamp).
 * 
 * @property {TravelDetails} details Travel Details.
 * @property {string} itineraryName Name of the Saved itinerary.
 * @property {string} color Color of the Saved itinerary.
 * 
 * @property {string} response The response from AI to User for planner.
 * @property {number} status Status of the Travel (For cancel or sth else by the User).
 */

/**
 * Travel Details.
 * @typedef {Object} TravelDetails
 * 
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
 * @type {import('mongoose').SchemaDefinition<TravelSchema>}
 */
const travelSchemaDefinition = {
    userId: { type: String, required: true },
    travelId: { type: String, required: true, unique: true },

    details: {
        destination: { type: String },
        budget: { type: String },
        duration: { type: Number },
        interests: { type: Array },
        accommodation: { type: String },
        travelWith: { type: String },
        moveByVehicle: { type: String },
        activities: { type: Array },
        cuisines: { type: Array },
        language: { type: String },
    },
    itineraryName: { type: String },
    color: { type: String },

    response: { type: String },
    status: { type: Number },
};

module.exports = travelSchemaDefinition;
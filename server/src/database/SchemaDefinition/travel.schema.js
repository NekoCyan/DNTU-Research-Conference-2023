// travel.schema.js

/**
 * @typedef {Object} TravelSchema
 * @property {string} userId User ID.
 * @property {string} destination Destination where to go.
 * @property {string} budget Budget for the travel.
 * @property {string} duration Duration of the travel.
 * @property {Array} interest Interests (Foods, Music, Historical...).
 * 
 * @property {string} plannedTimestamp The time that User generate planner to AI.
 * @property {string} response The response from AI to User for planner.
 * @property {number} status Status of the Travel (For cancel or sth else by the User).
 */

/**
 * @type {import('mongoose').SchemaDefinition<TravelSchema>}
 */
const travelSchemaDefinition = {
    userId: { type: String, required: true },
    destination: { type: String, required: true },
    budget: { type: String, required: true },
    duration: { type: String, required: true },
    interest: { type: Array },
    
    plannedTimestamp: { type: String, required: true },
    response: { type: String },
    status: { type: Number },
};

module.exports = travelSchemaDefinition;
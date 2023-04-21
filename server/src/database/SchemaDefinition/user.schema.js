// user.schema.js

/**
 * @typedef {Object} UserSchema
 * @property {string} userId User ID.
 * @property {string} fullname User Fullname.
 * @property {string} username User Username.
 * @property {string} password User Password.
 * @property {string} email User Email.
 * @property {string} token User Token.
 */

/**
 * @type {import('mongoose').SchemaDefinition<UserSchema>}
 */
const userSchemaDefinition = {
    userId: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String },
    token: { type: String },
};

module.exports = userSchemaDefinition;
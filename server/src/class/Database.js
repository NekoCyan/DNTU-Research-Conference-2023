const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const {
    defaultDatabaseOptions, mergeDefault, _optionsRequired
} = require('../utils/Util').prototype;

const SchemaDefinitionHandler = require('../database/handler');

const log = (msg) => console.log(`[DATABASE] ${msg}`);

/**
 * @type {import('../../typings/index').Database}
 */
class Database {
    /**
     * @param {import('../../typings/index').DatabaseOptions} options 
     */
    constructor(options = {}) {
        /**
         * @type {import('../../typings/index').DatabaseOptions}
         */
        this.options = mergeDefault(defaultDatabaseOptions(), options);

        /**
         * @private
         */
        this.connectedTimestamp = null;

        this._validateOptions();
    }

    /**
     * Validate Options.
     * @private
     * @returns {void}
     */
    _validateOptions() {
        _optionsRequired(this.options, 'url', 'string');
        _optionsRequired(this.options, 'name', 'string');
        _optionsRequired(this.options, 'breakOnError', 'boolean');

        this.options.url = this.options.url.replace('localhost', '127.0.0.1');
    }

    /**
     * Create Connection to Database.
     * @returns {Promise<void>}
     */
    async connect() {
        if (this.ready) throw new Error(`Database is already connected.`);
        log(`Connection which Break On Error is ${this.options.breakOnError}.`);
        if (!this.options.url) throw new Error(`Database URL is required.`);
        if (!this.options.name) throw new Error(`Database Name is required.`);

        const dbURL = this.options.url;
        const dbName = this.options.name;

        log(`Connecting to /${dbName} ...`);
        await mongoose.connect(`${dbURL}/${dbName}`)
            .then(() => {
                log(`Connected to /${dbName} !`);
                this.connectedTimestamp = Date.now();
            })
            .catch(err => {
                log(`An error occurred while connecting to /${dbName} with the following error:\n${err?.message || err.stack || err}`);
                if (this.options.breakOnError == true) process.exit(0);
            });
    }

    /**
     * Remove Connection to Database.
     * @returns {Promise<void>}
     */
    async disconnect() {
        if (!this.ready) throw new Error(`Database is not connected.`);

        const dbName = this.options.name;

        await mongoose.disconnect().then(() => {
            log(`Disconnected from /${dbName} !`);
            this.connectedTimestamp = null;
        }).catch(err => {
            log(`An error occurred while disconnecting from /${dbName} with the following error:\n${err?.message || err.stack || err}`)
            if (this.options.breakOnError == true) process.exit(0);
        });
    }

    /**
     * Create Schema / Get Collection about this Schema.
     * @returns {import('../../typings/schema').UserModel}
     */
    User() {
        if (!this.ready) throw new Error(`Database is not connected.`);

        const newSchema = new Schema(SchemaDefinitionHandler.userSchemaDefinition);

        return mongoose.models.user || mongoose.model('user', newSchema);
    }

    /**
     * Create Schema / Get Collection about this Schema.
     * @returns {import('../../typings/schema').TravelModel}
     */
    Travel() {
        if (!this.ready) throw new Error(`Database is not connected.`);

        const newSchema = new Schema(SchemaDefinitionHandler.travelSchemaDefinition);

        return mongoose.models.travel || mongoose.model('travel', newSchema);
    }

    /**
     * Is Database Connected.
     * @returns {boolean}
     */
    get ready() {
        return this.connectedTimestamp != null ? true : false;
    }

    /**
     * Database Connected Timestamp.
     * @returns {number | null}
     */
    get timestamp() {
        return this.connectedTimestamp;
    }
}

module.exports = Database;
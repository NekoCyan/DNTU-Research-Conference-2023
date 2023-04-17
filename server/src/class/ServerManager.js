const { Collection } = require('@discordjs/collection');
const {
    defaultServerManager, mergeDefault, _optionsRequired
} = require('../utils/Util').prototype;

/**
 * @type {import('../../typings/index').ServerManager}
 */
class ServerManager {
    /**
     * @param {import('../../typings/index').ServerManagerOptions} options 
     */
    constructor(options = {}) {
        /**
         * @type {import('../../typings/index').ServerManagerOptions}
         */
        this.options = mergeDefault(defaultServerManager(), options);

        this.routes = new Collection();
        this.db = null;

        this._validateOptions();
    }

    /**
     * Validate Options.
     * @private
     * @returns {void}
     */
    _validateOptions() {
        _optionsRequired(this.options, 'debug', 'boolean');
    }
}

module.exports = ServerManager;
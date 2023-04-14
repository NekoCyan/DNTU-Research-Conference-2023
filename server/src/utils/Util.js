const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);

class Util {
    constructor() {
        this.autoBind(this);
    }
    
    /**
     * Export Response for API.
     * @param {number} code Response Code.
     * @param {string} message Response Message.
     * @param {Array<Data> | string | object | null} data Response Data.
     * @returns {{code: number, isError: boolean, message: string, data?: Array<Data> | string | null}}
     */
    APIResponseHandler(code, message, data = null) {
        if (!code || !message) throw new Error(`Response Status Code and Response Code and Response Message is required.`);
        if (typeof code !== 'number') throw new Error(`Response Code must be Number.`);
        if (typeof message !== 'string') throw new Error(`Response Message must be String.`);

        return {
            code: code,
            isError: code >= 0 ? false : true,
            message: message,
            data: data
        }
    }

    /**
     * Split every "/" from Original URL.
     * @param {string} url URL String.
     * @returns {Array<string>} URL String.
     */
    URLHandler(url = "") {
        if (typeof url !== 'string') throw new Error(`URL must be String.`);

        return url.split('/').filter(x => x).map(x => x.toLowerCase());
    }

    /**
     * Sets default properties on an object that aren't already specified.
     * @credits discord.js
     * @param {Object} def Default properties
     * @param {Object} given Object to assign defaults to
     * @returns {Object}
     */
    mergeDefault(def, given) {
        if (!given) return def;
        for (const key in def) {
            if (!has(given, key) || given[key] === undefined) {
                given[key] = def[key];
            } else if (given[key] === Object(given[key])) {
                given[key] = Util.mergeDefault(def[key], given[key]);
            }
        }

        return given;
    }

    /**
     * Bind all methods in a class.
     * @param {object} obj 
     * @returns {void}
     */
    autoBind(obj) {
        for (const method of Object.getOwnPropertyNames(Object.getPrototypeOf(obj))) {
            if (method !== 'constructor' && typeof obj[method] === 'function') {
                obj[method] = obj[method].bind(obj);
            }
        }

        return obj;
    }
}

module.exports = Util;
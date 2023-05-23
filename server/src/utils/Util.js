const md5 = require('md5');
const { 
    EMAIL_PATTERN,
} = require('./Constants');
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
     * 
     * @param {object} objToCheck 
     * @param {Array<import('../../typings/index').RouteDataArrayRequired>} objRequired 
     * @param {'query' | 'header' | 'body'} type Request Type.
     * @returns {{type: string, data: Array<string>}}
     */
    checkRequirement(objToCheck, objRequired, type) {
        if (!objRequired || !objRequired[0]) return this?.RequirementHandler(type) || Util.prototype.RequirementHandler(type);

        let missingRequired = [];

        const filterRequired = objRequired.filter(x => x?.required == true);
        for (const i of filterRequired) {
            if (!objToCheck[i.name] || [null, undefined].includes(objToCheck[i.name])) {
                missingRequired.push(i.name);
            }
        }

        return this?.RequirementHandler(type, missingRequired) || Util.prototype.RequirementHandler(type, missingRequired);
    }

    /**
     * 
     * @param {'query' | 'header' | 'body'} type 
     * @param {Array<string>} data 
     * @returns {{type: string, data: Array<string>}}
     */
    RequirementHandler(type, data = []) {
        return {
            type,
            data: data || [],
        }
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
                given[key] = this?.mergeDefault(def[key], given[key]) || Util.prototype.mergeDefault(def[key], given[key]);
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
                try {
                    obj[method] = obj[method].bind(obj);
                } catch (e) {
                    continue;
                }
            }
        }

        return obj;
    }

    /**
     * Default Database Options.
     * @returns {import('../../typings/index').DatabaseOptions}
     */
    defaultDatabaseOptions() {
        return {
            url: process.env.DATABASE_URL,
            name: process.env.DATABASE_NAME,
            breakOnError: true
        }
    }

    /**
     * Default Server Manager Options.
     * @returns {import('../../typings/index').ServerManagerOptions}
     */
    defaultServerManager() {
        return {
            debug: false,
            ShowRequiredRequest: true,
        }
    }

    /**
     * Hash MD5.
     * @param {string} input 
     * @param {number} times Hash times.
     */
    hashMD5(input, times = 1) {
        if (typeof input !== 'string') throw new Error(`Input must be String.`);
        if (typeof times !== 'number' && times != 0) throw new Error(`Times must be Number.`);
        if (times <= 0) return input;

        return this?.hashMD5(md5(input), times - 1) || Util.prototype.hashMD5(md5(input), times - 1);
    }

    /**
     * Random String.
     * @see https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
     * @param {number} length lenght of result of string.
     * @returns {string}
     */
    randomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    /**
     * Check if mail is valid.
     * @see https://stackoverflow.com/questions/60737672/email-regex-pattern-in-nodejs
     * @param {string} mail 
     * @returns {boolean}
     */
    isValidMail(mail) {
        let mailFormat = EMAIL_PATTERN;
        return !!(mail !== '' && mail.match(mailFormat));
    }

    /**
     * Set the first letter of the string to uppercase.
     * @param {string} string 
     * @returns {string}
     */
    Capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
     * Options Required.
     * @param {object} obj
     * @param {string} optionsName 
     * @param {'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined' | 'array'} dataType 
     * @returns {Error | void}
     */
    _optionsRequired(obj, optionsName, dataType) {
        if (!optionsName) throw new Error(`optionsName is missing.`);
        if (!dataType) throw new Error(`dataType is missing.`);

        const dataTypes = ['bigint', 'boolean', 'function', 'number', 'object', 'string', 'symbol', 'undefined', 'array'];
        dataType = dataType?.toLowerCase();
        if (!dataTypes.includes(dataType)) throw new Error(`dataType must be one of the following: ${dataTypes.join(', ')}.`);

        if ([undefined, null].some(x => x == obj[optionsName])) throw new Error(`Options: "${optionsName}" is required.`);
        if (dataType === 'array' && !Array.isArray(obj[optionsName])) throw new Error(`${optionsName} must be an ${dataType}.`);
        else {
            if (typeof obj[optionsName] !== dataType) throw new Error(`${optionsName} must be a ${dataType}.`);
        }
    }
}

module.exports = Util;
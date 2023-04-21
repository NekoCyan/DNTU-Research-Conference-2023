const RouteManager = require('../../../class/RouteManager');
const Util = require('../../../utils/Util');

/**
 * @type {import('../../../../typings').RouteData}
 */
module.exports = {
    status: true,
    query: null,
    headers: null,
    body: null,
    authorization: true,
    /**
     * @param {RouteManager} param0
     * @param {Util} param2
     * @returns {Promise<APIResponseHandler>}
     */
    async run({
        _server, req, res, next, GetUser,
    }, {
        APIResponseHandler, hashMD5,
    }) {
        const User = await await GetUser();
        if (User instanceof Error) return APIResponseHandler(-1, "Internal Server Error");
        else if (!User) return APIResponseHandler(-1, "Unauthorized.");
        else {
            console.log(User);
    
            return "Authorized.";
        }
    }
}
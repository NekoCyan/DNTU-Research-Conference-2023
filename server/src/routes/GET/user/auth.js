const RouteManager = require('../../../class/RouteManager');
const Util = require('../../../utils/Util');

module.exports = {
    status: true,
    query: {
        type: 'token', required: true
    },
    body: null,
    /**
     * @param {RouteManager} param0
     * @param {Util} param2
     * @returns {Promise<APIResponseHandler>}
     */
    async run({
        _server, req, res, next,
    }, {
        APIResponseHandler, hashMD5,
    }) {
        const { token } = req.query;

        // to do later.
        return "ehe";
    }
}
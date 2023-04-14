const RouteManager = require('../../../class/RouteManager');
const Util = require('../../../utils/Util');

module.exports = {
    status: true,
    query: null,
    body: [
        { name: 'type', required: true },
        { name: 'username', required: true },
        { name: 'password', required: true },
    ],
    /**
     * @param {RouteManager} param0
     * @param {Util} param2
     * @returns {Promise<APIResponseHandler>}
     */
    async run({
        _server, req, res, next,
    }, {
        APIResponseHandler, 
    }) {
        return APIResponseHandler(200, 'success', {
            username: req.body.username,
            password: req.body.password,
            msg: `=))`
        });
    }
}
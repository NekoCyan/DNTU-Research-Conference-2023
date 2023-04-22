/**
 * @type {import('../../../../typings').RouteData}
 */
module.exports = {
    status: true,
    query: [
        { name: 'token', required: true },
    ],
    headers: null,
    body: null,
    authorization: true,
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
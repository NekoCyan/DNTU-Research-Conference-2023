/**
 * @type {import('../../../../typings').RouteData}
 */
module.exports = {
    status: true,
    query: null,
    headers: null,
    body: null,
    authorization: true,
    async run({
        _server, req, res, next, GetUser, 
    }, {
        APIResponseHandler, hashMD5, 
    }) {
        const User = await GetUser();
        if (!User) return;

        return APIResponseHandler(1, "Authorized.", {
            userId: User.userId,
            username: User.username,
            fullname: User.fullname,
            email: User?.email || null,
        });
    }
}
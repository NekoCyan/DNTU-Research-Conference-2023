const RouteManager = require('../../../class/RouteManager');
const Util = require('../../../utils/Util');

module.exports = {
    status: true,
    query: null,
    body: [
        { name: 'username', required: true },
        { name: 'password', required: true },
    ],
    /**
     * @param {RouteManager} param0
     * @param {Util} param1
     * @returns {Promise<APIResponseHandler>}
     */
    async run({
        _server, req, res, next,
    }, {
        APIResponseHandler, hashMD5, randomString,
    }) {
        const { username, password } = req.body;

        const User = await _server.db.User();
        
        const reg = /^[a-z0-9]+$/; // Only allow lowercase and number.
        if (!reg.test(username)) return APIResponseHandler(-1, 'Username only contains lowercase letters and number.');

        const checkUsername = await User.findOne({ username });
        if (!checkUsername) return APIResponseHandler(-1, 'Invalid Username or Password.');
        if (checkUsername.password != hashMD5(password, 3)) return APIResponseHandler(-1, 'Invalid Username or Password.');

        const newToken = randomString(64);
        try {
            const res = await User.findOneAndUpdate({ username }, { token: newToken }, { new: true });
            return APIResponseHandler(200, 'Authorized.', { token: res.token });
        } catch (e) {
            console.log(e);
            return APIResponseHandler(-1, 'An error occurred while logging you in, please try again later.');
        }
    }
}
const RouteManager = require('../../../class/RouteManager');
const Util = require('../../../utils/Util');

/**
 * @type {import('../../../../typings').RouteData}
 */
module.exports = {
    status: true,
    query: null,
    headers: null,
    body: [
        { name: 'fullname', required: true },
        { name: 'username', required: true },
        { name: 'password', required: true },
        { name: 'email', required: false },
    ],
    authorization: false,
    /**
     * @param {RouteManager} param0
     * @param {Util} param1
     * @returns {Promise<APIResponseHandler>}
     */
    async run({
        _server, req, res, next,
    }, {
        APIResponseHandler, hashMD5, randomString, isValidMail,
    }) {
        const { username, password, fullname, email } = req.body;

        const User = await _server.db.User();

        const reg = /^[a-z0-9]+$/; // Only allow lowercase and number.
        if (!reg.test(username)) return APIResponseHandler(-1, 'Username only contains lowercase letters and number.');

        const checkUsername = await User.findOne({ username });
        if (checkUsername) return APIResponseHandler(-1, 'Username is already Exists.');
        if (email && !isValidMail(email)) return APIResponseHandler(-1, 'Invalid Email.');

        const newToken = randomString(64);

        try {
            const res = await User.create({
                userId: (await User.count()) + 1,
                username,
                password: hashMD5(password, 3),
                fullname,
                email,
                token: newToken,
            });

            return APIResponseHandler(200, 'Authorized.', { token: res.token });
        } catch (e) {
            console.log(e);
            return APIResponseHandler(-1, 'An error occurred while signing you up, please try again later.');
        }
    }
}
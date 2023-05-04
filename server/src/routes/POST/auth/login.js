const {
    USERNAME_PATTERN, PASSWORD_PATTERN,
} = require('../../../utils/Constants');

/**
 * @type {import('../../../../typings').RouteData}
 */
module.exports = {
    status: true,
    query: null,
    headers: null,
    body: [
        { name: 'username', required: true },
        { name: 'password', required: true },
    ],
    authorization: false,
    async run({
        _server, req, res, next,
    }, {
        APIResponseHandler, hashMD5, randomString,
    }) {
        const { username, password } = req.body;

        try {
            if (password?.length < 8) return APIResponseHandler(-1, 'Password must be at least 8 characters.');

            const regUsername = USERNAME_PATTERN;
            if (!regUsername.test(username)) return APIResponseHandler(-1, 'Username only contains lowercase letters and number.');

            const regPassword = PASSWORD_PATTERN;
            if (!regPassword.test(password)) return APIResponseHandler(-1, 'Password only contains lowercase letters, uppercase letters, number, and special characters.');

            const User = await _server.db.User();

            const checkUsername = await User.findOne({ username });
            if (!checkUsername) return APIResponseHandler(-1, 'Invalid Username or Password.');

            if (checkUsername.password != hashMD5(password, 3)) return APIResponseHandler(-1, 'Invalid Username or Password.');

            const newToken = randomString(64);
            
            const res = await User.findOneAndUpdate({ username }, { token: newToken }, { new: true });
            return APIResponseHandler(200, 'Authorized.', { token: res.token });
        } catch (e) {
            console.log(e);
            return APIResponseHandler(-1, 'An error occurred while logging you in, please try again later.');
        }
    }
}
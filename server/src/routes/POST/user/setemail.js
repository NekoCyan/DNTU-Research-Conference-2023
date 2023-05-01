/**
 * @type {import('../../../../typings').RouteData}
 */
module.exports = {
    status: true,
    query: null,
    headers: null,
    body: [
        { name: 'email', required: true }
    ],
    authorization: true,
    async run({
        _server, req, res, next, GetUser, EmailValidator,
    }, {
        APIResponseHandler,
    }) {
        const { email } = req.body;

        const User = await GetUser();
        if (!User) return;

        try {
            const EValidator = await EmailValidator(_server, email, User);
            if (EValidator != true) return EValidator;

            await User.updateOne({
                $set: {
                    email: email,
                }
            });
            return APIResponseHandler(200, "Email Updated.");
        } catch (e) {
            console.log(e);
            return APIResponseHandler(-1, 'An error occurred while updating your email, please try again later.');
        }
    }
}
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
        _server, req, res, next, GetUser,
    }, {
        APIResponseHandler, isValidMail, 
    }) {
        const { email } = req.body;
        
        const User = await GetUser();
        if (!User) return;

        try {
            if (email) {
                // Validate.
                if (!isValidMail(email)) return APIResponseHandler(-1, 'Invalid Email.');
                if (email == User.email) return APIResponseHandler(-1, 'You are using this email.');

                // Check unique Email.
                const EmailExists = await (await _server.db.User()).findOne({ email: email });
                console.log(EmailExists);
                if (EmailExists) return APIResponseHandler(-1, 'This email already exists, please use another Email.');
            }

            if (!email && !User.email) return APIResponseHandler(-1, 'You must provide an email to update.');
            
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
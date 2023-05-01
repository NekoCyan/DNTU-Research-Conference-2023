const express = require('express');
const Util = require('../utils/Util').prototype;

class RouteManager {
    /**
     * POST
     * @param {import('../../typings/index').ServerManager} _server Server Manager.
     * @param {express.Request} req Request by User.
     * @param {express.Response} res Response from Server to User.
     * @param {express.NextFunction} next Next Function.
     */
    constructor(_server, req, res, next) {
        this._server = _server;
        this.req = req;
        this.res = res;
        this.next = next;

        Util.autoBind(this);
    }

    /**
     * @param {string} authorization
     * @default this.req.headers.authorization Request Authorization from Headers.
     */
    async GetUser(authorization = this.req.headers.authorization) {
        if (!authorization) return null;

        const User = await this._server.db.User();
        try {
            const resUser = await User.findOne({ token: authorization });

            if (resUser) {
                return resUser;
            } else {
                this.res.send(Util.APIResponseHandler(-1, "Unauthorized."));
                return null;
            }
        } catch (e) {
            this.res.send(Util.APIResponseHandler(-1, "Internal Server Error."));
            return null;
        }
    }

    /**
     * @param {import('../../typings/index').ServerManager} _server 
     * @param {string} email
     * @param {import('../../typings/schema').UserSchema} User 
     */
    async EmailValidator(_server, email, User = null) {
        if (email) {
            // Validate.
            if (!Util.isValidMail(email)) return Util.APIResponseHandler(-1, 'Invalid Email.');
            if (User && email == User.email) return Util.APIResponseHandler(-1, 'You are using this email.');

            try {
                // Check unique Email.
                const EmailExists = await (await _server.db.User()).findOne({ email: email });
                if (EmailExists) return Util.APIResponseHandler(-1, 'This email is already exists, please use another Email.');
            } catch (e) {
                console.log(e);
                return Util.APIResponseHandler(-1, 'An error occurred while checking your email, please try again later.');
            }
        }

        if (User && !email && !User.email) return Util.APIResponseHandler(-1, 'You must provide an email to set or update.');

        if (typeof email != 'string') return Util.APIResponseHandler(-1, 'Email must be a string.');

        return true;
    } // Doing validate for email change for route register.
}

module.exports = RouteManager;
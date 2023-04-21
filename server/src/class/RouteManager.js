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
        await (this.GetUser())
    }

    /**
     * 
     * @param {string} authorization Default is authorization in Headers
     * @default this.req.headers.authorization Request Authorization from Headers.
     */
    async GetUser(authorization = this.req.headers.authorization) {
        const User = await this._server.db.User();
        try {
            const resUser = await User.findOne({ token: authorization });
            return resUser;
        } catch (e) {
            return e;
        }
    }
}

module.exports = RouteManager;
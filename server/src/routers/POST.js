const express = require('express');
const {
    APIResponseHandler, URLHandler, Capitalize, checkRequirement,
} = require('../utils/Util').prototype;

const RouteManager = require('../class/RouteManager');
const Util = require('../utils/Util').prototype;

/**
 * POST.
 * @param {import('../../typings/index').ServerManager} _server Server Manager.
 * @param {express.Request} req Request by User.
 * @param {express.Response} res Response from Server to User.
 * @param {express.NextFunction} next Next Function.
 */
module.exports = async (_server, req, res, next) => {
    const URL = URLHandler(req.baseUrl);
    const Router = req.method;
    const input = `${Router}:/${URL.join('/')}`;
    
    if (_server.options.dedug == true) {
        console.log(req);
        console.log(input);
    }

    const findRoute = _server.routes.get(input);
    if (findRoute) {
        const checkQuery = checkRequirement(req.query, findRoute.query, 'query');
        const checkHeaders = checkRequirement(req.headers, findRoute.headers, 'headers');
        const checkBody = checkRequirement(req.body, findRoute.body, 'body');

        if (checkQuery.data[0] || checkHeaders.data[0] || checkBody.data[0]) {
            const missingRequired = () => {
                if (checkQuery.data[0]) return checkQuery;
                if (checkHeaders.data[0]) return checkHeaders;
                if (checkBody.data[0]) return checkBody;
            }

            if (_server.options.ShowRequiredRequest == true) {
                res.json(APIResponseHandler(-1, `${Capitalize(missingRequired().type)} Parameters are missing, please provide these params: ${missingRequired().data.join(', ')}.`));
            } else {
                res.json(APIResponseHandler(-1, 'Parameters for Query, Headers or Body is Missing.'));
            }
        } else if (findRoute.authorization == true && !req.headers.authorization) {
            res.json(APIResponseHandler(-1, 'Unauthorized.'));
        } else {
            const Manager = new RouteManager(_server, req, res, next);
            const callback = await findRoute.run(Manager, Util);
            return res.send(callback);
        }
    } else {
        res.json(APIResponseHandler(-1, 'Not found.'));
    }

    next();
}
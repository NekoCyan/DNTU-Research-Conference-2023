const express = require('express');
const {
    APIResponseHandler, URLHandler,
} = require('../utils/Util').prototype;

const RouteManager = require('../class/RouteManager');
const Util = require('../utils/Util').prototype;

/**
 * GET.
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
        const checkQuery = checkRequirement(req.query, findRoute.query);
        const checkBody = checkRequirement(req.body, findRoute.body);

        if (!checkQuery || !checkBody) {
            res.json(APIResponseHandler(-1, 'Parameters for Query or Body is Missing.'));
        } else {
            const Manager = new RouteManager(_server, req, res, next);
            const callBack = await findRoute.run(Manager, Util);
            return res.send(callBack);
        }
    } else {
        res.json(APIResponseHandler(-1, 'Not found.'));
    }

    next();
}

/**
 * 
 * @param {object} objToCheck 
 * @param {Array<import('../../typings/index').RouteDataArrayRequired>} objRequired 
 * @returns {boolean}
 */
function checkRequirement(objToCheck, objRequired) {
    if (!objRequired || !objRequired[0]) return true;

    let allow = true;

    const filterRequired = objRequired.filter(x => x?.required == true);
    for (const i of filterRequired) {
        if (!objToCheck[i.name]) {
            allow = false;
            break;
        }
    }

    return allow;
}
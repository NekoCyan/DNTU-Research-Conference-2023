//Load environment variables (Secret).
const secret = require('./utils/secret');
secret();

// Load required modules.
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ServerManager = require('./class/ServerManager');
const RoutesHandler = require('./handlers/routesHandler');
const Database = require('./class/Database');

/**
 * @type {import('../typings/index').ServerManager}
 */
const _server = new ServerManager({
    dedug: false,
});
// Load Routes.
RoutesHandler(_server);
// Database Connection.
_server.db = new Database();

// Asynchronous for Database before open Gateway.
(async () => {
    // Create Connection to Database.
    await _server.db.connect();

    // Routers.
    const GET = require('./routers/GET');
    const POST = require('./routers/POST');

    // App & Router.
    const app = express();
    const router = express.Router();

    const PORT = process.env.PORT || 3000;

    // Use extension.
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.raw());

    // Validate body input (avoid unexpected).
    app.use(function (req, res, next) {
        req.rawBody = '';
        req.setEncoding('utf8');

        req.on('data', function (chunk) {
            req.rawBody += chunk;
        });

        req.on('end', function () {
            if (!req.rawBody) return next();
            try {
                const tryBodyParse = JSON.parse(req.rawBody);
                req.body = tryBodyParse;
                next();
            } catch (e) {
                res.status(400).send('Bad Request.');
            }
        });
    });

    // "*" means send all direction to the router.
    app.use("*", router);

    // Handle get & post request.
    router.get("*", async (req, res, next) => {
        if (req.originalUrl.includes('favicon.ico')) {
            res.status(204).end();
        } else {
            return await GET(_server, req, res, next);
        }
    });
    router.post("*", async (req, res, next) => {
        try {
            if (req.originalUrl.includes('favicon.ico')) {
                res.status(204).end();
            } else {
                return await POST(_server, req, res, next);
            }
        } catch (err) {
            console.log(err);
            res.send("Error.");
        }
    });

    // App listen.
    app.listen(PORT, () => {
        console.log(`[SERVER] listening on port ${PORT}`);
    });
})();
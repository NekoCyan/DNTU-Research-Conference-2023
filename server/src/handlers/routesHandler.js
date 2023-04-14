const { readdirSync } = require("fs");
const path = require('path');
const routesDir = path.join(__dirname, '../routes/');
const { mergeDefault } = require('../utils/Util').prototype;

/**
 * Load Routes URL.
 * @param {import('../../typings/index').ServerManager} _server 
 * @param {boolean} reload
 * @returns {void}
 */
module.exports = (_server, reload = false) => {
    let dir = [];
    let loaded = [];

    const mainDir = dirReader(routesDir);
    dir.push(...mainDir.filter(x => x.isDirectory).map(x => x.name));
    for (let i = 0; i < dir.length; i++) {
        const currentDir = dirReader(dir[i]);
        const filterJS = currentDir.filter(x => x.name.endsWith('.js'));
        for (const i of filterJS) {
            let pull = require(i.name);
            if (pull?.status == true) {
                pull = mergeDefault(pull, { route: getRouteURL(i.name) });

                _server.routes.set(pull.route, pull);
                console.log(pull)
                loaded.push(pull.route);
            } else {
                continue;
            }
        }

        dir.push(...currentDir.filter(x => x.isDirectory).map(x => x.name));
    }

    console.log(`${_server.routes.size} Route(s) Loaded.\n${loaded.map(x => x).join('\n')}`);
}

/**
 * Get all files and directories in a directory.
 * @param {string} path 
 * @returns {Array<{name: string, isDirectory: boolean}>}
 */
function dirReader(path) {
    const data = readdirSync(path, { withFileTypes: true });

    return data.map(function (x) {
        return {
            name: `${path}/${x.name}`,
            isDirectory: x.isDirectory()
        }
    });
}

/**
 * Split routes directory and get the next string.
 * @param {string} str 
 * @returns {string}
 */
function getRouteURL(str) {
    let split = str.split('routes\\');

    split.shift(); // remove first element.

    split = split
        .join('')
        .toLowerCase()
        .replace(/.js/g, '')
        .split('/'); // remove .js and split every "/".

    split.shift(); // remove the "/" at first.

    split[0] = split[0].toUpperCase() + ':'; // Change Router to UPPER.

    return split.join('/');
}
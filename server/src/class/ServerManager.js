const { Collection } = require('@discordjs/collection');

class ServerManager {
    constructor() {
        this.routes = new Collection();
    }
}

module.exports = ServerManager;
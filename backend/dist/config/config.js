"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = exports.PORT = void 0;
exports.PORT = 8080;
exports.environment = {
    development: {
        serverURL: "http://localhost:" + exports.PORT + "/",
        dbString: 'mongodb://henrik2:treecko@it2810-11.idi.ntnu.no:27017/pokedb?authSource=pokedb'
    },
    production: {
        serverURL: "http://localhost:" + exports.PORT + "/",
        dbString: 'mongodb://henrik2:treecko@it2810-11.idi.ntnu.no:27017/pokedb?authSource=pokedb'
    }
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teams = exports.Pokemons = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = require("../config/config");
var pokemonSchema_1 = require("./schema/pokemonSchema");
var teamSchema_1 = require("./schema/teamSchema");
mongoose_1.default.connect(config_1.environment['development'].dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose_1.default.connection;
db.on('error', function () {
    console.error("Error while connecting to DB");
});
var Pokemons = mongoose_1.default.model('Pokemon', pokemonSchema_1.pokemonSchema, 'Pokemons');
exports.Pokemons = Pokemons;
var Teams = mongoose_1.default.model('Team', teamSchema_1.teamSchema, 'Teams');
exports.Teams = Teams;

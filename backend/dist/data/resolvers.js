"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var apollo_server_errors_1 = require("apollo-server-errors");
var dbConnector_1 = require("../db/dbConnector");
exports.resolvers = {
    Query: {
        getFilteredPokemon: function (_, args) {
            var query = args.input.name
                ? dbConnector_1.Pokemons.find({
                    name: { $regex: "^" + args.input.name, $options: 'is' }
                })
                : dbConnector_1.Pokemons.find();
            if (args.input.pokeTypes && args.input.pokeTypes.length !== 0) {
                query.find({
                    pokeTypes: { $all: args.input.pokeTypes },
                });
            }
            if (args.input.rating && args.input.rating > 0) {
                query.find({
                    rating: { $gte: args.input.rating },
                });
            }
            var sortingOptions = {};
            if (args.input.sortBy !== undefined) {
                sortingOptions["stats." + args.input.sortBy] = args.input.sortDesc ? -1 : 1;
            }
            sortingOptions.entry_number = 1;
            var searchCount = dbConnector_1.Pokemons.count(query);
            query.sort(sortingOptions).skip(args.input.offset).limit(args.input.limit);
            return new Promise(function (resolve, reject) {
                resolve({ pokemons: query.exec(),
                    count: searchCount,
                });
            });
        },
        getAllTeams: function () {
            return new Promise(function (resolve, reject) {
                dbConnector_1.Teams.find(function (err, teams) {
                    if (err)
                        reject(err);
                    else
                        resolve(teams);
                });
            });
        },
        getPokemonById: function (_, args) {
            return new Promise(function (resolve, reject) {
                var pokemon = dbConnector_1.Pokemons.findOne({ entry_number: args.input.id }, function (err, result) {
                    if (err || !result) {
                        throw new apollo_server_errors_1.UserInputError("The id does not match any existing pokemon.");
                    }
                    else {
                        resolve(pokemon);
                    }
                });
            });
        },
    },
    Mutation: {
        createTeam: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var teamsWithProvidedName, newTeam;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, dbConnector_1.Teams.countDocuments({ name: args.input.name })];
                    case 1:
                        teamsWithProvidedName = _a.sent();
                        if (teamsWithProvidedName > 0) {
                            return [2, new Promise(function (resolve, reject) {
                                    throw new apollo_server_errors_1.UserInputError("The team name specified is not unique.");
                                })];
                        }
                        newTeam = new dbConnector_1.Teams({
                            name: args.input.name,
                            pokemon: [],
                        });
                        return [2, new Promise(function (resolve, reject) {
                                newTeam.save(function (err) {
                                    if (err)
                                        reject(err);
                                    else
                                        resolve(newTeam);
                                });
                            })];
                }
            });
        }); },
        addPokemon: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var team, newPokemon, teams_count, oldPokemon;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, dbConnector_1.Teams.findOne({ name: args.input.teamName })];
                    case 1:
                        team = _a.sent();
                        return [4, dbConnector_1.Pokemons.findOne({ entry_number: args.input.pokemonId })];
                    case 2:
                        newPokemon = _a.sent();
                        if (!!team.pokemon.some(function (pokemon) { return pokemon.name === newPokemon.name; })) return [3, 7];
                        return [4, dbConnector_1.Teams.count()];
                    case 3:
                        teams_count = _a.sent();
                        if (!(team.pokemon.length === 6)) return [3, 5];
                        return [4, dbConnector_1.Pokemons.findOne({ name: team.pokemon[args.input.index].name })];
                    case 4:
                        oldPokemon = _a.sent();
                        oldPokemon.usage_percentage = (oldPokemon.usage_percentage * teams_count - 1.0) / (teams_count);
                        team.pokemon[args.input.index] = newPokemon;
                        return [3, 6];
                    case 5:
                        team.pokemon.push(newPokemon);
                        _a.label = 6;
                    case 6:
                        newPokemon.usage_percentage = (newPokemon.usage_percentage * teams_count + 1.0) / (teams_count);
                        _a.label = 7;
                    case 7: return [2, new Promise(function (resolve, reject) {
                            team.save(function (err) {
                                if (err)
                                    reject(err);
                                else
                                    resolve(team);
                            });
                        })];
                }
            });
        }); },
        ratePokemon: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var pokemon, oldRating, newRating;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, dbConnector_1.Pokemons.findOne({ entry_number: args.input.id }, function (err, result) {
                            if (err || !result)
                                return new Promise(function (resolve, reject) { reject(err); });
                        })];
                    case 1:
                        pokemon = _a.sent();
                        oldRating = parseFloat(pokemon.rating);
                        newRating = (oldRating * pokemon.rating_count + args.input.rating) / (pokemon.rating_count + 1.0);
                        pokemon.rating = newRating;
                        pokemon.rating_count += 1;
                        return [2, new Promise(function (resolve, reject) {
                                pokemon.save(function (err) {
                                    if (err)
                                        reject(err);
                                    else
                                        resolve(pokemon);
                                });
                            })];
                }
            });
        }); }
    }
};

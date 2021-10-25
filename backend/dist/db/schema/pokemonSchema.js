"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pokemonSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.pokemonSchema = new mongoose_1.default.Schema({
    entry_number: {
        type: Number,
    },
    name: {
        type: String
    },
    pokeTypes: {
        type: Array
    },
    stats: {
        type: Object,
    },
    weight: {
        type: Number
    },
    rating: {
        type: Number,
    },
    rating_count: {
        type: Number,
    },
    usage_percentage: {
        type: Number,
    },
    sprite_url: {
        type: String
    },
});

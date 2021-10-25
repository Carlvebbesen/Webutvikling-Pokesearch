import { Double } from 'mongodb';
import mongoose from 'mongoose';

export const pokemonSchema = new mongoose.Schema({
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

import mongoose from 'mongoose';

export const pokemonSchema = new mongoose.Schema({
    name: {
        type: String
    },
    pokeTypes: {
        type: Array
    },
    stats: {
        type: Array,
    },
    weight: {
        type: Number
    },
    rating: {
        type: Number
    },
    usage_percentage: {
        type: Number
    },
    sprite_url: {
        type: String
    },
});

import mongoose from 'mongoose';

export const pokemonSchema = new mongoose.Schema({
    id: Number,
    name: String,
    types: [{
        name: String,
    }],
    stats: [{
        name: String,
        base_stat: Number,
    }],
    weight: Number,
    rating: Number,
    usage_percentage: Number,
    sprite_url: String,
});

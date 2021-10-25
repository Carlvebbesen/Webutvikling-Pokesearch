import mongoose from 'mongoose';

export const teamSchema = new mongoose.Schema({
    name: {
        type: String
    },
    pokemon: {
        type: Array
    }
});
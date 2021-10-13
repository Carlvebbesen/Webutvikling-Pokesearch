import mongoose from 'mongoose';
import { environment } from '../config/config';
import { pokemonSchema } from './schema/pokemonSchema';
const env = process.env.NODE_ENV || "development";

/**
 * Mongoose Connection
**/

mongoose.connect(environment[env].dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', () => {
    console.error("Error while connecting to DB");
});

const Pokemons = mongoose.model('Pokemon', pokemonSchema, 'Pokemons');

export { Pokemons };
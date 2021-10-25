import mongoose from 'mongoose';
import { environment } from '../config/config';
import { pokemonSchema } from './schema/pokemonSchema';
import { teamSchema } from './schema/teamSchema';

/**
 * Mongoose Connection
**/

mongoose.connect(environment['development'].dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', () => {
    console.error("Error while connecting to DB");
});

const Pokemons = mongoose.model('Pokemon', pokemonSchema, 'Pokemons');
const Teams = mongoose.model('Team', teamSchema, 'Teams')

export { Pokemons, Teams };
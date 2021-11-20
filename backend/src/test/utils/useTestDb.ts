import mongoose from 'mongoose';
import fs from 'fs';
import { pokemonSchema } from '../../db/schema/pokemonSchema';
import { teamSchema } from '../../db/schema/teamSchema';

export const useTestDb = (dbUri: string | undefined) => {

    mongoose.connect(dbUri ?? "", { useUnifiedTopology: true, useNewUrlParser: true });
    
    const populateDb = () => {
        const Pokemons = mongoose.connection.collections['Pokemons']
            ?? mongoose.model('Pokemon', pokemonSchema, 'Pokemons');
        const Teams = mongoose.connection.collections['Teams']
            ?? mongoose.model('Team', teamSchema, 'Teams');
        let pokemonJson = fs.readFileSync('prodPokemon.json', 'utf8');
        let prodPokemon = JSON.parse(pokemonJson);
        return Pokemons.insertMany(prodPokemon);
    }

    const cleanDb = async () => {
        return mongoose.connection.collections['Pokemons']?.deleteMany({})
            .then(() => {
                mongoose.connection.collections['Teams']?.deleteMany({});
            })
    };

    return { populateDb, cleanDb };
}
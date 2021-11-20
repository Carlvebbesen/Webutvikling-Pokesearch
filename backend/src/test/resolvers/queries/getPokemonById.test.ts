import { request } from 'graphql-request';
import each from 'jest-each';

import { GET_POKEMON_BY_ID } from '../../grapqhlCalls';
import { Pokemon } from '../../../data/resolver.types';
import { useTestDb } from '../../utils/useTestDb';

const { populateDb, cleanDb } = useTestDb(process.env.SERVER_URI);

describe("Query getPokemonById", () => {

    beforeEach((done) => {
        populateDb().then(() => done());
    })

    afterEach((done) => {
        cleanDb().then(() => done());
    })

    each([
        [103],
        [24],
        [10001],
        [215],
        [177],
    ]).it("Gives pokemon with entry number equal to provided id", async (pokeId: number) => {
        await request('http://localhost:8000/graphql', GET_POKEMON_BY_ID,
        {
            id: pokeId,
        })
            .then((data) => {
                let fetchedPokemon: Pokemon = data.getPokemonById;
                expect(fetchedPokemon.entry_number).toEqual(pokeId);
            });
    })
})
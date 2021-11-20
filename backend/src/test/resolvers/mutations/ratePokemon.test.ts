import { request } from 'graphql-request';
import each from 'jest-each';

import { RATE_POKEMON } from '../../grapqhlCalls';
import { Pokemon } from '../../../data/resolver.types';
import { useTestDb } from '../../utils/useTestDb';

const { populateDb, cleanDb } = useTestDb(process.env.SERVER_URI);

describe("Mutation rate pokemon", () => {

    beforeEach((done) => {
        populateDb().then(() => done());
    })

    afterEach((done) => {
        cleanDb().then(() => done());
    })

    each([
        { pokeId: 36, givenRating: 3.5},
        { pokeId: 207, givenRating: 2.5},
        { pokeId: 567, givenRating: 4.1},
        { pokeId: 788, givenRating: 4.6},
    ])
    .it("Rating a pokemon changes the average rating and increments rating count", (input) => {
        return request('http://localhost:8000/graphql', RATE_POKEMON,
        {
            id: input.pokeId,
            rating: input.givenRating,
        })
            .then((data) => {
                let ratedPokemon: Pokemon = data.ratePokemon;
                expect(ratedPokemon.rating).toEqual(input.givenRating);
                expect(ratedPokemon.rating_count).toEqual(1);
            });
    })
})
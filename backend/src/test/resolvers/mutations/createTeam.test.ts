import { request } from 'graphql-request';
import { Team } from '../../../data/resolver.types';

import { CREATE_TEAM } from '../../grapqhlCalls';
import { useTestDb } from '../../utils/useTestDb';

const { populateDb, cleanDb } = useTestDb(process.env.SERVER_URI);

describe("Mutation create team", () => {

    beforeEach((done) => {
        populateDb().then(() => done());
    })

    afterEach((done) => {
        cleanDb().then(() => done());
    })

    it("Creates team with unique name and starting pokemon", () => {
        return request('http://localhost:8000/graphql', CREATE_TEAM,
        {
            name: "Amazing 4",
            pokemons: [24, 32, 16, 109],
        })
            .then((data) => {
                let createdTeam: Team = data.createTeam;
                let pokemonIds = data.createTeam.pokemon.map((pokemon: { entry_number: number}) => pokemon.entry_number);
                expect(createdTeam.name).toEqual("Amazing 4");
                expect(
                    pokemonIds.includes(24) &&
                    pokemonIds.includes(32) &&
                    pokemonIds.includes(16) &&
                    pokemonIds.includes(109)
                ).toBeTruthy();
            });
    })
})
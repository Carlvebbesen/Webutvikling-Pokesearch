import { request } from 'graphql-request';
import each from 'jest-each';

import { GET_FILTERED_POKEMON } from '../../grapqhlCalls';
import { Pokemon } from '../../../data/resolver.types';
import { useTestDb } from '../../utils/useTestDb';

const { populateDb, cleanDb } = useTestDb(process.env.SERVER_URI);

describe("Query getFilteredPokemon", () => {

    beforeEach((done) => {
        populateDb().then(() => done());
    })

    afterEach((done) => {
        cleanDb().then(() => done());
    })

    it("Empty filter gives all pokemon", () => {
        return request('http://localhost:8000/graphql', GET_FILTERED_POKEMON,
        {
            name: undefined,
            pokeTypes: undefined,
            rating: undefined,
            limit: 1118,
            offset: 0,
            sortBy: undefined,
            sortDesc: undefined,
        })
            .then((data) => {
                let fetchedPokemon: Pokemon[] = data.getFilteredPokemon.pokemons;
                expect(fetchedPokemon.length).toEqual(1118);

                //Default sorting should be ascending on entry number.
                let prevEntryNumber = 0;
                fetchedPokemon.forEach((pokemon) => {
                    expect(pokemon.entry_number).toBeGreaterThan(prevEntryNumber);
                    prevEntryNumber = pokemon.entry_number;
                })
            });
    })

    it("Filter on type gives pokemon of specified type only", () => {
        return request('http://localhost:8000/graphql', GET_FILTERED_POKEMON,
        {
            name: undefined,
            pokeTypes: ['grass', 'dark'],
            rating: undefined,
            limit: 1118,
            offset: 0,
            sortBy: undefined,
            sortDesc: undefined,
        })
            .then((data) => {
                let fetchedPokemon: Pokemon[] = data.getFilteredPokemon.pokemons;
                
                let prevEntryNumber = 0;
                fetchedPokemon.forEach((pokemon) => {

                    //Should include all provided types.
                    expect(pokemon.pokeTypes.includes('grass')).toBe(true);
                    expect(pokemon.pokeTypes.includes('dark')).toBe(true);

                    //Default sorting should be ascending on entry number.
                    expect(pokemon.entry_number).toBeGreaterThan(prevEntryNumber);
                    prevEntryNumber = pokemon.entry_number;
                })
            });
    })

    it("Filter on search gives pokemon with name containing search content only", () => {
        return request('http://localhost:8000/graphql', GET_FILTERED_POKEMON,
        {
            name: "ca",
            pokeTypes: undefined,
            rating: undefined,
            limit: 1118,
            offset: 0,
            sortBy: undefined,
            sortDesc: undefined,
        })
            .then((data) => {
                let fetchedPokemon: Pokemon[] = data.getFilteredPokemon.pokemons;
                
                let prevEntryNumber = 0;
                fetchedPokemon.forEach((pokemon) => {

                    expect(pokemon.name).toMatch(/[a-z]*ca[a-z]*/);

                    //Default sorting should be ascending on entry number.
                    expect(pokemon.entry_number).toBeGreaterThan(prevEntryNumber);
                    prevEntryNumber = pokemon.entry_number;
                })
            });
    })

    it("Filter on minimum rating gives pokemon with provided rating or higher only", () => {
        return request('http://localhost:8000/graphql', GET_FILTERED_POKEMON,
        {
            name: undefined,
            pokeTypes: undefined,
            rating: 3.0,
            limit: 1118,
            offset: 0,
            sortBy: undefined,
            sortDesc: undefined,
        })
            .then((data) => {
                let fetchedPokemon: Pokemon[] = data.getFilteredPokemon.pokemons;
                
                let prevEntryNumber = 0;
                fetchedPokemon.forEach((pokemon) => {

                    expect(pokemon.rating).toBeGreaterThanOrEqual(3.0);

                    //Default sorting should be ascending on entry number.
                    expect(pokemon.entry_number).toBeGreaterThan(prevEntryNumber);
                    prevEntryNumber = pokemon.entry_number;
                })
            });
    })

    each([
        ["hp"],
        ["attack"],
        ["defense"],
        ["special_attack"],
        ["special_defense"],
        ["speed"],
        ["total"],
    ]).it("Sorts on '%s' ascending", (stat: "hp" | "attack" | "defense" | "special_attack" | "special_defense" | "speed" | "total") => {
        return request('http://localhost:8000/graphql', GET_FILTERED_POKEMON,
        {
            name: undefined,
            pokeTypes: undefined,
            rating: undefined,
            limit: 1118,
            offset: 0,
            sortBy: stat,
            sortDesc: undefined,
        })
            .then((data) => {
                let fetchedPokemon: Pokemon[] = data.getFilteredPokemon.pokemons;
                
                let prevValue = 0;
                fetchedPokemon.forEach((pokemon) => {
                    expect(pokemon.stats[stat]).toBeGreaterThanOrEqual(prevValue);
                    prevValue = pokemon.stats[stat];
                })
            });
    })

    each([
        ["hp"],
        ["attack"],
        ["defense"],
        ["special_attack"],
        ["special_defense"],
        ["speed"],
        ["total"],
    ]).it("Sorts on '%s' descending", (stat: "hp" | "attack" | "defense" | "special_attack" | "special_defense" | "speed" | "total") => {
        return request('http://localhost:8000/graphql', GET_FILTERED_POKEMON,
        {
            name: undefined,
            pokeTypes: undefined,
            rating: undefined,
            limit: 1118,
            offset: 0,
            sortBy: stat,
            sortDesc: true,
        })
            .then((data) => {
                let fetchedPokemon: Pokemon[] = data.getFilteredPokemon.pokemons;
                
                let prevValue = Infinity;
                fetchedPokemon.forEach((pokemon) => {
                    expect(pokemon.stats[stat]).toBeLessThanOrEqual(prevValue);
                    prevValue = pokemon.stats[stat];
                })
            });
    })
})
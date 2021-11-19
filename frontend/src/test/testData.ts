import {FilteredPokemon, Pokemon} from "../utils/Pokemon";
import {
    ADD_RATING_BY_POKEMONID,
    GET_FILTERED_POKEMONS,
    GET_POKEMON_BY_ID,
} from "../queries";

export const filteredData = {
    pokemons: [
        {
            name: "TestPokemonGrassPoison",
            pokeTypes: ["grass", "posion"],
            sprite_url:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
            entry_number: "1",
            stats: {
                hp: 1,
                attack: 2,
                defense: 3,
                special_attack: 4,
                special_defense: 5,
                speed: 6,
                total: 7,
            },
        },
        {
            name: "TestPokemonFire",
            pokeTypes: ["fire"],
            sprite_url:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png",
            entry_number: "2",
            stats: {
                hp: 14,
                attack: 122,
                defense: 23,
                special_attack: 42,
                special_defense: 25,
                speed: 26,
                total: 27,
            },
        },
        {
            name: "TestPokemonWater",
            pokeTypes: ["water"],
            sprite_url:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
            entry_number: "3",
            stats: {
                hp: 45,
                attack: 49,
                defense: 49,
                special_attack: 65,
                special_defense: 65,
                speed: 45,
                total: 318,
            },
        },
    ],
    count: 3,
} as unknown as FilteredPokemon;

export const filteredDataMocks = [
    {
        request: {
            query: GET_FILTERED_POKEMONS,
            variables: {
                input: {
                    limit: 10,
                    offset: 0,
                },
            },
        },
        result: {
            data: {
                getFilteredPokemon: {
                    pokemons: [
                        {
                            name: "TestPokemonGrassPoison",
                            pokeTypes: ["grass", "posion"],
                            sprite_url:
                                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
                            entry_number: 1,
                            stats: {
                                hp: 1,
                                attack: 2,
                                defense: 3,
                                special_attack: 4,
                                special_defense: 5,
                                speed: 6,
                                total: 7,
                            },
                        },
                        {
                            name: "TestPokemonWater",
                            pokeTypes: ["water"],
                            sprite_url:
                                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
                            entry_number: 2,
                            stats: {
                                hp: 45,
                                attack: 49,
                                defense: 49,
                                special_attack: 65,
                                special_defense: 65,
                                speed: 45,
                                total: 318,
                            },
                        },
                        {
                            name: "TestPokemonFire",
                            pokeTypes: ["fire"],
                            sprite_url:
                                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png",
                            entry_number: 3,
                            stats: {
                                hp: 14,
                                attack: 122,
                                defense: 23,
                                special_attack: 42,
                                special_defense: 25,
                                speed: 26,
                                total: 27,
                            },
                        },
                    ],
                    count: 3,
                },
            },
        },
    },
    {
        request: {
            query: GET_FILTERED_POKEMONS,
            variables: {
                input: {
                    limit: 10,
                    offset: 10,
                },
            },
        },
        result: {
            data: {
                getFilteredPokemon: {
                    pokemons: [
                        {
                            name: "TestPokemonOffset",
                            pokeTypes: ["grass", "posion"],
                            sprite_url:
                                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
                            entry_number: 11,
                            stats: {
                                hp: 1,
                                attack: 2,
                                defense: 3,
                                special_attack: 4,
                                special_defense: 5,
                                speed: 6,
                                total: 7,
                            },
                        },
                    ],
                    count: 1,
                },
            },
        },
    },
    {
        request: {
            query: GET_FILTERED_POKEMONS,
            variables: {
                input: {
                    limit: 10,
                    offset: 0,
                    sortBy: undefined,
                    sortDesc: true,
                },
            },
        },
        result: {
            data: {
                getFilteredPokemon: {
                    pokemons: [
                        {
                            name: "TestPokemonFirePokemonId3",
                            pokeTypes: ["fire"],
                            sprite_url:
                                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png",
                            entry_number: 3,
                            stats: {
                                hp: 14,
                                attack: 122,
                                defense: 23,
                                special_attack: 42,
                                special_defense: 25,
                                speed: 26,
                                total: 27,
                            },
                        },
                        {
                            name: "TestPokemonWaterPokemonId2",
                            pokeTypes: ["water"],
                            sprite_url:
                                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
                            entry_number: 2,
                            stats: {
                                hp: 45,
                                attack: 49,
                                defense: 49,
                                special_attack: 65,
                                special_defense: 65,
                                speed: 45,
                                total: 318,
                            },
                        },
                        {
                            name: "TestPokemonGrassPoisonPokemonId1",
                            pokeTypes: ["grass", "posion"],
                            sprite_url:
                                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
                            entry_number: 1,
                            stats: {
                                hp: 1,
                                attack: 2,
                                defense: 3,
                                special_attack: 4,
                                special_defense: 5,
                                speed: 6,
                                total: 7,
                            },
                        },
                    ],
                    count: 3,
                },
            },
        },
    },
    {
        request: {
            query: GET_FILTERED_POKEMONS,
            variables: {
                input: {
                    sortDesc: true,
                    limit: 10,
                    offset: 0,
                    sortBy: "hp",
                },
            },
        },
        result: {
            data: {
                getFilteredPokemon: {
                    pokemons: [
                        {
                            name: "TestPokemonWaterHp45",
                            pokeTypes: ["water"],
                            sprite_url:
                                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
                            entry_number: 2,
                            stats: {
                                hp: 45,
                                attack: 49,
                                defense: 49,
                                special_attack: 65,
                                special_defense: 65,
                                speed: 45,
                                total: 318,
                            },
                        },
                        {
                            name: "TestPokemonFireHp14",
                            pokeTypes: ["fire"],
                            sprite_url:
                                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png",
                            entry_number: 3,
                            stats: {
                                hp: 14,
                                attack: 122,
                                defense: 23,
                                special_attack: 42,
                                special_defense: 25,
                                speed: 26,
                                total: 27,
                            },
                        },
                        {
                            name: "TestPokemonGrassPoisonHp1",
                            pokeTypes: ["grass", "posion"],
                            sprite_url:
                                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
                            entry_number: 1,
                            stats: {
                                hp: 1,
                                attack: 2,
                                defense: 3,
                                special_attack: 4,
                                special_defense: 5,
                                speed: 6,
                                total: 7,
                            },
                        },
                    ],
                    count: 3,
                },
            },
        },
    },
    {
        request: {
            query: GET_FILTERED_POKEMONS,
            variables: {
                input: {
                    sortDesc: false,
                    limit: 10,
                    offset: 0,
                    sortBy: "hp",
                },
            },
        },
        result: {
            data: {
                getFilteredPokemon: {
                    pokemons: [
                        {
                            name: "TestPokemonGrassPoisonHp1",
                            pokeTypes: ["grass", "posion"],
                            sprite_url:
                                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
                            entry_number: 1,
                            stats: {
                                hp: 1,
                                attack: 2,
                                defense: 3,
                                special_attack: 4,
                                special_defense: 5,
                                speed: 6,
                                total: 7,
                            },
                        },
                        {
                            name: "TestPokemonFireHp14",
                            pokeTypes: ["fire"],
                            sprite_url:
                                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png",
                            entry_number: 3,
                            stats: {
                                hp: 14,
                                attack: 122,
                                defense: 23,
                                special_attack: 42,
                                special_defense: 25,
                                speed: 26,
                                total: 27,
                            },
                        },
                        {
                            name: "TestPokemonWaterHp45",
                            pokeTypes: ["water"],
                            sprite_url:
                                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
                            entry_number: 2,
                            stats: {
                                hp: 45,
                                attack: 49,
                                defense: 49,
                                special_attack: 65,
                                special_defense: 65,
                                speed: 45,
                                total: 318,
                            },
                        },
                    ],
                    count: 3,
                },
            },
        },
    },
    {
        request: {
            query: GET_FILTERED_POKEMONS,
            variables: {
                input: {
                    limit: 10,
                    offset: 0,
                    name: "TestPokemonWater",
                },
            },
        },
        result: {
            data: {
                getFilteredPokemon: {
                    pokemons: [
                        {
                            name: "TestPokemonWater",
                            pokeTypes: ["water"],
                            sprite_url:
                                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
                            entry_number: 2,
                            stats: {
                                hp: 45,
                                attack: 49,
                                defense: 49,
                                special_attack: 65,
                                special_defense: 65,
                                speed: 45,
                                total: 318,
                            },
                        },
                    ],
                    count: 1,
                },
            },
        },
    },
    {
        request: {
            query: GET_FILTERED_POKEMONS,
            variables: {
                input: {
                    limit: 10,
                    offset: 0,
                    rating: 3,
                },
            },
        },
        result: {
            data: {
                getFilteredPokemon: {
                    pokemons: [
                        {
                            name: "TestPokemonRating",
                            pokeTypes: ["grass"],
                            sprite_url:
                                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
                            entry_number: 1,
                            stats: {
                                hp: 1,
                                attack: 2,
                                defense: 3,
                                special_attack: 4,
                                special_defense: 5,
                                speed: 6,
                                total: 7,
                            },
                        },
                    ],
                    count: 1,
                },
            },
        },
    },
];
export const mocks = [
    {
        request: {
            query: GET_POKEMON_BY_ID,
            variables: {input: {id: 6}},
        },
        result: {
            data: {
                getPokemonById: {
                    entry_number: 6,
                    name: "charizard",
                    pokeTypes: ["fire", "flying"],
                    rating: 4.2,
                    rating_count: 5,
                    sprite_url:
                        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
                    stats: {
                        attack: 84,
                        defense: 78,
                        hp: 78,
                        special_attack: 109,
                        special_defense: 85,
                        speed: 100,
                        total: 534,
                    },
                    usage_count: 3,
                    weight: 905,
                },
            },
        },
    },
    {
        request: {
            query: ADD_RATING_BY_POKEMONID,
            variables: {input: {id: 6, rating: 3}},
        },
        result: {
            data: {
                ratePokemon: {
                    rating: 3,
                    rating_count: 10
                }
            },
        },
    },
];

export const testPokemon1 = {
    name: "Charizard",
    pokeTypes: ["fire", "flying"],
    sprite_url:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/6.png",
    entry_number: "6",
    stats: {
        hp: 78,
        attack: 84,
        defense: 78,
        special_attack: 109,
        special_defense: 85,
        speed: 100,
        total: 534,
    },
    weight: 90.5,
    rating: 4,
    number_of_ratings: 2,
    usage_count: 2,
} as unknown as Pokemon;

export const testPokemon2 = {
    name: "Blastoise",
    pokeTypes: ["water"],
    sprite_url:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/9.png",
    entry_number: "9",
    stats: {
        hp: 79,
        attack: 89,
        defense: 100,
        special_attack: 85,
        special_defense: 105,
        speed: 78,
        total: 530,
    },
    weight: 85.5,
    rating: 4.1,
    number_of_ratings: 2,
    usage_count: 1,
} as unknown as Pokemon;

export const mockFilter: never[] = [];

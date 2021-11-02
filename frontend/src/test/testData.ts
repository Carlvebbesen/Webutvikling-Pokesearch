import {FilteredPokemon, Pokemon} from "../utils/Pokemon";
import {GET_FILTERED_POKEMONS} from "../queries";

export const filteredData: FilteredPokemon = {
    pokemons: [
        {
            name: "bulbasaur",
            pokeTypes: ["grass", "posion"],
            sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
            entry_number: "1",
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
            name: "bulbasar",
            pokeTypes: ["grass", "posion"],
            sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
            entry_number: "2",
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
            name: "bulbasar",
            pokeTypes: ["grass", "posion"],
            sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
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
    ] as unknown as Pokemon[],
    count: 3,
}

export const overviewMocks = [
    {
        request: {
            query: GET_FILTERED_POKEMONS,
            variables: {
                input: {
                    limit: 50,
                    name: "",
                    offset: 0,
                }
            },
        },
        result: {
            data: {
                pokemons: [
                    {
                        name: "grassPoison",
                        pokeTypes: ["grass", "posion"],
                        sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
                        entry_number: "1",
                        stats: {
                            hp: 1,
                            attack: 2,
                            defense: 3,
                            special_attack: 4,
                            special_defense: 5,
                            speed: 6,
                            total: 7,
                        }
                    },
                    {
                        name: "fire",
                        pokeTypes: ["fire"],
                        sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png",
                        entry_number: "2",
                        stats: {
                            hp: 14,
                            attack: 122,
                            defense: 23,
                            special_attack: 42,
                            special_defense: 25,
                            speed: 26,
                            total: 27,
                        }
                    }],
                count: 2
            }
        }
    }
];


export const mockFilter: never[] = [
];
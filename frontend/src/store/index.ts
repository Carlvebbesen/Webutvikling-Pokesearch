import {atom, selector} from "recoil";
import {Pokemon} from "../utils/Pokemon";

const bulb : Pokemon = {
    id: 1,
    name: "Bulbasaur",
    type: ["grass", "poison"],
    stats: [{name: "Leaf", value: 2}],
    weight: 20,
    rating: 4.5,
    number_of_ratings: 10,
    usage_percentage: 2,
    sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
}
const char : Pokemon = {
    id: 4,
    name: "Charmander",
    type: ["fire"],
    stats: [{name: "Leaf", value: 2}],
    weight: 20,
    rating: 4.5,
    number_of_ratings: 10,
    usage_percentage: 2,
    sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
}

const squirtle : Pokemon = {
    id: 7,
    name: "Squirtle",
    type: ["water"],
    stats: [{name: "Leaf", value: 2}],
    weight: 20,
    rating: 4.5,
    number_of_ratings: 10,
    usage_percentage: 2,
    sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
}

export const pokemonTeam = atom<Pokemon[]>({
    key: "pokemonTeam",
    default: [bulb, char, squirtle]
});

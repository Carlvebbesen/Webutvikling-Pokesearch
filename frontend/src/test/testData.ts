import { FilteredPokemon, Pokemon } from "../utils/Pokemon";

export const mocks: never[]= [];

export const filteredData: FilteredPokemon ={
  pokemons: [
    {
      name: "bulbasar",
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


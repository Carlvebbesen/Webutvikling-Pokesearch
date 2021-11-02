import { FilteredPokemon, Pokemon } from "../utils/Pokemon";

export const mockFilter: never[] = [
//   {getFilteredPokemons:
//   {
//     pokemons: [
//       {
//         name: "grassPoison",
//         pokeTypes: ["grass", "posion"],
//         sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
//         entry_number: "1",
//         stats: {
//           hp: 1,
//           attack: 2,
//           defense: 3,
//           special_attack: 4,
//           special_defense: 5,
//           speed: 6,
//           total: 7,
//         },
//         {
//           name: "grass",
//           pokeTypes: ["grass"],
//           sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
//           entry_number: "2",
//           stats: {
//             hp: 7,
//             attack: 6,
//             defense: 3,
//             special_attack: 2,
//             special_defense: 1,
//             speed: 4,
//             total: 2,
//           },
//           {
//             name: "fire",
//             pokeTypes: ["fire"],
//             sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
//             entry_number: "3",
//             stats: {
//               hp: 2,
//               attack: 1,
//               defense: 10,
//               special_attack: 3,
//               special_defense: 2,
//               speed: 1,
//               total: 3,
//             },
//           {
//             name: "poison",
//             pokeTypes: ["posion"],
//             sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
//             entry_number: "4",
//             stats: {
//               hp: 2,
//               attack: 1,
//               defense: 1,
//               special_attack: 3,
//               special_defense: 13,
//               speed: 1,
//               total: 3,
//             },
//           {
//             name: "water",
//             pokeTypes: ["water"],
//             sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
//             entry_number: "5",
//             stats: {
//               hp: 2,
//               attack: 1,
//               defense: 1,
//               special_attack: 3,
//               special_defense: 20,
//               speed: 1,
//               total: 3,
//             },
    ]
//     count:5
//   }}
// ];

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
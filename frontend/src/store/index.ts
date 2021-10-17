import {atom, selector} from "recoil";
import {PokemonData} from "../data/pokemonData";
import {Pokemon} from "../pages/myTeamPage/myTeam";

export const pokemonTeam = atom({
    key: "pokemonTeam",
    default: [0]
});

export const updatedPokemonTeam = selector({
    key: "updatedPokemonTeam",
    get: ({get}) => {
        const indexList = get(pokemonTeam);

        const getPokemon = (index : number) => {
            return PokemonData.find(poke => poke.id === index);
        };

        const pokemon : Pokemon[] = [];

        for (const index of indexList){
            const poke : Pokemon | undefined = getPokemon(index)
            if (poke !== undefined) {
                pokemon.push(poke)
            }
        }
        return pokemon;
    }

})


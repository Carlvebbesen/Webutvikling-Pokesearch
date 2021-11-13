import {atom} from "recoil";
import {Pokemon} from "../utils/Pokemon";

export const pokemonTeam = atom<Pokemon[]>({
    key: "pokemonTeam",
    default: []
});

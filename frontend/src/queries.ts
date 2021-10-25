import gql from "graphql-tag";

export const GET_FILTERED_POKEMONS = gql`
query GetFilteredPokemon($input: FilterInput){
    getFilteredPokemon(input: $input){
        pokemons {
            name,
            pokeTypes,
            sprite_url,
            rating
        },
        count
    }
}
`;
export const GET_ALL_TEAMS = gql`
query GetAllTeams{
    getAllTeams{
    name,
    pokemon {
        name,
        weight,
    },
    }
}
`;
export type listPokemon ={
    name: string,
    pokeTypes: string[],
    rating: number,
    sprite_url: string,
}

export type FilteredPokemon = {
    pokemons: listPokemon[],
    count: number,
}
export type Stats = {
    hp: number,
    attack: number,
    defense: number,
    special_attack: number,
    special_defense: number,
    speed: number,
    total: number,
}
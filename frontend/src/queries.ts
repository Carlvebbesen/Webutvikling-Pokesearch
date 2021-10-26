import gql from "graphql-tag";

export const GET_FILTERED_POKEMONS = gql`
query GetFilteredPokemon($input: FilterInput){
    getFilteredPokemon(input: $input){
        pokemons {
            name,
            pokeTypes,
            sprite_url,
            entry_number,
        },
        count
    }
}
`;
export const GET_POKEMON_BY_ID = gql`
query GetPokemonById($input: PokemonByIdInput){
    getPokemonById(input: $input){
            name,
            pokeTypes,
            stats{
                hp,
                attack,
                defense,
                special_attack,
                special_defense,
                speed,
                total,
            },
            weight,
            rating,
            rating_count,
            usage_percentage,
            sprite_url,
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
    sprite_url: string,
    entry_number: number,
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
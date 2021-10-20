import gql from "graphql-tag";

export const GET_FILTERED_POKEMONS = gql`
query GetFilteredPokemon($input: FilterInput){
    getFilteredPokemon(input: $input){
        pokemons {
            name,
            pokeTypes,
            stats {
                    name,
                    base_stat,
        },
        weight,
        rating,
        usage_percentage,
        sprite_url,
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
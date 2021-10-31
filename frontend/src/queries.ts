import gql from "graphql-tag";

export const GET_FILTERED_POKEMONS = gql`
query GetFilteredPokemon($input: FilterInput){
    getFilteredPokemon(input: $input){
        pokemons {
            name,
            pokeTypes,
            sprite_url,
            entry_number,
            stats{
                hp,
                attack,
                defense,
                special_attack,
                special_defense,
                speed,
                total,
            },
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
        pokeTypes,
        sprite_url,
    },
    }
}
`;

export const ADD_RATING_BY_POKEMONID =gql`
mutation RatePokemon($input: RatePokemonInput){
    ratePokemon(input: $input){
        rating,
        rating_count,
    }
}
`;

export const CREATE_TEAM = gql`
mutation CreateTeam($input: TeamInput){
    createTeam(input: $input){
        name
    }
}
`;
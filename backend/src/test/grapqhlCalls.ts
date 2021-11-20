
export const GET_FILTERED_POKEMON = `
query GetFilteredPokemon(
    $name: String,
    $pokeTypes: [String],
    $rating: Float,
    $limit: Int!,
    $offset: Int!,
    $sortBy: String,
    $sortDesc: Boolean,
){
    getFilteredPokemon(input: {
        name: $name,
        pokeTypes: $pokeTypes,
        rating: $rating,
        limit: $limit,
        offset: $offset,
        sortBy: $sortBy,
        sortDesc: $sortDesc,
    }) {
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
                rating,
            },
            count
        }
}
`;

export const GET_POKEMON_BY_ID = `
query GetPokemonById(
    $id: Int!,
){
    getPokemonById(input: {
        id: $id,
    }) {
            entry_number,
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
            usage_count,
            sprite_url,
        }
}
`;

export const GET_ALL_TEAMS = `
    query getAllTeams {
        name,
        pokemon {
            entry_number,
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
            usage_count,
            sprite_url,
        }
    }
`;

export const CREATE_TEAM = `
mutation CreateTeam(
    $name: String,
    $pokemons: [Int],
) {
    createTeam(input: {
        name: $name,
        pokemons: $pokemons,
    }) {
        name,
        pokemon {
            entry_number,
        },
    }
}
`;

export const RATE_POKEMON = `
mutation RatePokemon(
    $id: Int,
    $rating: Float,
) {
    ratePokemon(input: {
        id: $id,
        rating: $rating,
    }) {
        rating,
        rating_count,
    }
}
`;
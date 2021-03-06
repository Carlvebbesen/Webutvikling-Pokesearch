import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Pokemon {
        entry_number: Int,
        name: String,
        pokeTypes: [String!]!,
        stats: Stats,
        weight: Int,
        rating: Float,
        rating_count: Int,
        usage_count: Float,
        sprite_url: String,
    }

    type PokemonFilter {
        pokemons: [Pokemon],
        count: Int,
    }

    type Stats {
        hp: Int,
        attack: Int,
        defense: Int,
        special_attack: Int,
        special_defense: Int,
        speed: Int,
        total: Int,
    }

    type Team {
        name: String,
        pokemon: [Pokemon],
    }

    input StatInput {
        name: String,
        base_stat: Int,
    }

    input FilterInput {
        name: String,
        pokeTypes: [String],
        rating: Float,
        limit: Int!,
        offset: Int!,
        sortBy: String,
        sortDesc: Boolean,
    }

    input PokemonByIdInput {
        id: Int!,
    }

    input TeamInput {
        name: String,
        pokemons: [Int],
    }

    input AddPokemonInput {
        teamName: String,
        pokemonId: Int,
        index: Int,
    }

    input RatePokemonInput {
        id: Int,
        rating: Float,
    }

    type Query {
        getFilteredPokemon(input: FilterInput): PokemonFilter,
        getAllTeams:[Team]
        getPokemonById(input: PokemonByIdInput): Pokemon
    }

    type Mutation {
        createTeam(input:TeamInput):Team,
        ratePokemon(input:RatePokemonInput):Pokemon,
    }

`;
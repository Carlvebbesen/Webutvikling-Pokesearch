export interface FilterInput {
    name: string,
    pokeTypes: [string] | [],
    rating: number,
    limit: number,
    offset: number,
    sortBy?: "hp" | "attack" | "defense" | "special-attack" | "special-defense" | "speed" | "total",
    sortDesc: Boolean,
}

export interface GetPokemonByIdInput {
    id: number,
}

export interface TeamInput {
    name: String,
    pokemons: number[],
}

export interface AddPokemonInput {
    teamName: string,
    pokemonId: number,
    index: number,
}

export interface Stats {
    hp: number,
    attack: number,
    defense: number,
    special_attack: number,
    special_defense: number,
    speed: number,
    total: number,
}

export interface Pokemon {
    entry_number: number,
    name: string,
    pokeTypes: [string],
    stats: Stats,
    weight: number,
    rating: number,
    rating_count: number,
    usage_count: number,
    sprite_url: string,
}

export interface Team {
    name: string,
    pokemon: [Pokemon],
}

export interface RatePokemonInput {
    id: number,
    rating: number,
}

export interface SortOptions {
    'stats.hp'?: 1 | -1,
    'stats.attack'?: 1 | -1,
    'stats.defense'?: 1 | -1,
    'stats.special-attack'?: 1 | -1,
    'stats.special-defense'?: 1 | -1,
    'stats.speed'?: 1 | -1,
    'stats.total'?: 1 | -1,
    entry_number?: 1 | -1,
}
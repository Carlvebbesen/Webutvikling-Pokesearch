export interface Pokemon {
    entry_number: number,
    name: string,
    pokeTypes: string[],
    stats: Stats,
    weight: number,
    rating: number,
    number_of_ratings: number,
    usage_percentage: number,
    sprite_url: string
}

export interface Stats {
    attack: number,
    defense: number,
    hp: number,
    special_attack: number | null,
    special_defense: number | null,
    speed: number,
    total: number,
}

export interface FilteredPokemon {
    pokemons: Pokemon[],
    count: number,
}
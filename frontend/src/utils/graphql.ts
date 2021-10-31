export type FilterInput = {
    name?: string,
    pokeTypes?: string[],
    rating?: number,
    sortDesc?: boolean,
    sortBy?: string,
    limit: number,
    offset: number,
}

export type PokemonId = {
    id: number;
}


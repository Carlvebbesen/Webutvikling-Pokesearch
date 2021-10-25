export type FilterInput = {
    name?: string,
    pokeTypes?: string[],
    rating?: number,
    sortDesc?: boolean,
    sortBy?: "hp" |"attack"| "defense"| "special-attack" |"special-defence" |"speed"| "total",
    limit: number,
    offset: number,
}


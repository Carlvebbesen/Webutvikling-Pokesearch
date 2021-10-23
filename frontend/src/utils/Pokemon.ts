export interface Pokemon {
    id: number,
    name: string,
    type: string[],
    stats: Attribute[],
    weight: number,
    rating: number,
    number_of_ratings: number,
    usage_percentage: number,
    sprite_url: string
}


export interface Attribute {
    name: string,
    value: number
}
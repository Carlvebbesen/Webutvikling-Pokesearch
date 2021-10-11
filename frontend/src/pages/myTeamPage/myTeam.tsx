import React from 'react';
import {PokemonData} from "../../data/pokemonData";
import MyTeamOverviewComponent from "../../components/myTeamOverviewComponent/myTeamOverviewComponent";


export type Pokemon = {
    id: number,
    name: string,
    type: string[],
    stats: ({ name: string; value: number } | { name: string; value: number })[],
    weight: number,
    rating: number,
    usage_percentage: number,
    sprite_url: string
}

export const MyTeam = () => {
    const data : Pokemon[] = [...PokemonData]

    return (
        <div className={"MyTeam"}>
            <MyTeamOverviewComponent pokemon={data}/>
        </div>
    );
}
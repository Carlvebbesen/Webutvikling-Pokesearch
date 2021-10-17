import React from 'react';
import MyTeamOverviewComponent from "../../components/myTeamOverviewComponent/myTeamOverviewComponent";


export type Pokemon = {
    id: number,
    name: string,
    type: string[],
    stats: ({ name: string; value: number })[],
    weight: number,
    rating: number,
    usage_percentage: number,
    sprite_url: string
}

export const MyTeam = () => {

    return (
        <div className={"MyTeam"}>
            <MyTeamOverviewComponent />
        </div>
    );
}
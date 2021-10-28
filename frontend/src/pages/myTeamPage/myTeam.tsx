import React from 'react';
import MyTeamOverviewComponent from "../../components/myTeamOverviewComponent/myTeamOverviewComponent";
import styles from "./myTeam.module.css";
import {DisplayTeams} from "../../components/displayTeams/displayTeams";


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
        <div className={styles.myTeamPage}>
            <h2 className={styles.myTeamHeadline}>My team</h2>
            <MyTeamOverviewComponent />
            <DisplayTeams />
        </div>
    );
}
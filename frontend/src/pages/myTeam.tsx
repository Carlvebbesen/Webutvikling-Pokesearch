import React from 'react';
import MyTeamOverviewComponent from "../components/myTeamOverviewComponent/myTeamOverviewComponent";
import styles from "./myTeam.module.css";
import {DisplayTeams} from "../components/displayTeams/displayTeams";

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
        <div>
            <div className={styles.myTeamPage}>
                <h2 className={styles.myTeamHeadline}>Current Team</h2>
                <MyTeamOverviewComponent />
                <h2 className={styles.teamsHeadline}>Teams</h2>
                <DisplayTeams />
            </div>
        </div>
    );
}
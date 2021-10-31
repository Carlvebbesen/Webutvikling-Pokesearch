import React from 'react';
import MyTeamOverviewComponent from "../components/myTeamOverviewComponent/myTeamOverviewComponent";
import styles from "./myTeam.module.css";
import {DisplayTeams} from "../components/displayTeams/displayTeams";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router';


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
    const history = useHistory();

    return (
        <div className={styles.myTeamPage}>
            <ArrowBackIcon sx={{ fontSize: 60 }} onClick={()=> history.push("/prosjekt3/")}/>
            <h2 className={styles.myTeamHeadline}>Current Team</h2>
            <MyTeamOverviewComponent />
            <DisplayTeams />
        </div>
    );
}
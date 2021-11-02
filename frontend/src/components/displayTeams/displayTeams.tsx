import React, { FC } from 'react';
import styles from "./displayTeams.module.css";
import {useQuery} from "@apollo/client";
import {GET_ALL_TEAMS} from "../../queries";
import {TeamInDisplayTeams} from "../teamInDisplayTeams/teamInDisplayTeams";
import {Team} from "../../utils/Pokemon";
import { CircularProgress } from '@mui/material';


interface IDisplayTeams {
    pokemonClicked: (value: number)=> void,
}

export const DisplayTeams: FC<IDisplayTeams> = ({pokemonClicked}) => {
    const {data, loading, error} = useQuery(GET_ALL_TEAMS);

 return (loading || error? <CircularProgress/> :
        <div className={styles.teams}>
            {data.getAllTeams.length === 0 ?
                <div>
                    There are noe teams available
                </div>
                : data.getAllTeams.map((team: Team, index: number) =>
                    <TeamInDisplayTeams team={team} pokemonClicked={pokemonClicked} />
                )}

        </div>
    );
}
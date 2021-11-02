import React, { useState } from 'react';
import styles from "./displayTeams.module.css";
import {useQuery} from "@apollo/client";
import {GET_ALL_TEAMS} from "../../queries";
import {TeamInDisplayTeams} from "../teamInDisplayTeams/teamInDisplayTeams";
import {Team} from "../../utils/Pokemon";
import { CircularProgress } from '@mui/material';
import BackgroundPopUp from '../backgroundPopup/backgroudPopUp';
import Popup from '../popup/Popup';

export const DisplayTeams = () => {
    const [pokemonId, setPokemonId] = useState<number|null>(null);
    const {data, loading, error} = useQuery(GET_ALL_TEAMS);

 return (loading || error? <CircularProgress/> :
            <>{pokemonId &&<BackgroundPopUp show={pokemonId!==null} clicked={()=> setPokemonId(null)}/>}
            {pokemonId && <Popup pokemonId={pokemonId} setOpen={()=>setPokemonId(null)}/>}
        <div className={styles.teams}>
            {data.getAllTeams.length === 0 ?
                <div>
                    There are noe teams available
                </div>
                : data.getAllTeams.map((team: Team, index: number) =>
                    <TeamInDisplayTeams team={team} pokemonClicked={(value)=>setPokemonId(value)} />
                )}

        </div>
        </>
    );
}
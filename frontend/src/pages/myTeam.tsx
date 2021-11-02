import React, { useState } from 'react';
import MyTeamOverviewComponent from "../components/myTeamOverviewComponent/myTeamOverviewComponent";
import styles from "./myTeam.module.css";
import {DisplayTeams} from "../components/displayTeams/displayTeams";
import BackgroundPopUp from '../components/backgroundPopup/backgroudPopUp';
import Popup from '../components/popup/Popup';

export type Pokemon = {
    id: number,
    name: string,
    type: string[],
    stats: ({ name: string; value: number })[],
    weight: number,
    rating: number,
    usage_count: number,
    sprite_url: string
}

export const MyTeam = () => {
const [pokemonId, setPokemonId] = useState<number|null>(null);
    return (
        <div>
            {pokemonId &&<BackgroundPopUp show={pokemonId!==null} clicked={()=> setPokemonId(null)}/>}
            {pokemonId && <Popup pokemonId={pokemonId} setOpen={()=>setPokemonId(null)}/>}
            <div className={styles.myTeamPage}>
                <h2 className={styles.myTeamHeadline}>Current Team</h2>
                <MyTeamOverviewComponent />
                <h2 className={styles.teamsHeadline}>Teams</h2>
                <DisplayTeams pokemonClicked={(value: number)=>setPokemonId(value)} />
            </div>
        </div>
    );
}
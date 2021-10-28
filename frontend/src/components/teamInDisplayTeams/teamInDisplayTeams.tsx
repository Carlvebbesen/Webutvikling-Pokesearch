import React from 'react';
import styles from "./teamInDisplayTeams.module.css";
import {getPokeTypeIcon} from "../../static/typeIcons/pokeTypeIcons";


export type PokemonInTeam = {
    name: string,
    type: string[],
    sprite_url: string
}

export type Team = {
    name: string,
    pokemon: PokemonInTeam[]
}

interface teamProps {
    team: Team
}


export const TeamInDisplayTeams = (team : teamProps) => {

    const name : string = team.team.name
    const pokemon : PokemonInTeam[] = team.team.pokemon

    return (
        <div>
            <div className={styles.teamName}> {name} </div>
            {pokemon.map((poke) =>
                <div className={styles.teamIn}>
                    <img src={poke.sprite_url} alt={"Photo of pokemon"} className={styles.pict}/>
                    <div className={styles.name}>{poke.name}</div>
                    <div className={styles.types} >
                        {poke.type.map(type => <img height="50" src={getPokeTypeIcon(type)} alt="PokeTypes" />)}
                    </div>
                </div>
            )}

        </div>
    );
}
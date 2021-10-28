import React from 'react';
import styles from "./displayTeams.module.css";
import {useQuery} from "@apollo/client";
import {GET_ALL_TEAMS} from "../../queries";
import {TeamInDisplayTeams} from "../teamInDisplayTeams/teamInDisplayTeams";
import {Pokemon} from "../../utils/Pokemon";


export type PokemonInTeam = {
    name: string,
    type: string[],
    sprite_url: string
}

export type Team = {
    name: string,
    pokemon: PokemonInTeam[]
}


export const DisplayTeams = () => {

    const {data, loading, error} = useQuery(GET_ALL_TEAMS)

    let teams : Team[];

    try {
        teams = data.getAllTeams()
    } catch (e) {
        const team : Team = {name: "Marius", pokemon: [
            {
                name: "Bulbasaur",
                type: ["grass", "poison"],
                sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
            }, {
                name: "Charmander",
                type: ["fire"],
                sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
            }, {
                name: "Squirtle",
                type: ["water"],
                sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
            }, {
                name: "Bulbasaur",
                type: ["grass", "poison"],
                sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
            }, {
                name: "Charmander",
                type: ["fire"],
                sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
            }, {
                name: "Squirtle",
                type: ["water"],
                sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
            }
        ]}
        teams = [team, team, team, team];
    }





    return (
        <div className={styles.teams}>
            {teams.length === 0 ?
                <div>
                    There are noe teams available
                </div>
                : teams.map((team, key) =>
                    <TeamInDisplayTeams team={team} key={key}/>
                )}

        </div>
    );
}
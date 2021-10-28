import React from 'react';
import styles from "./teamInDisplayTeams.module.css";
import {getPokeTypeIcon} from "../../static/typeIcons/pokeTypeIcons";
import {Card, CardContent, Grid, Typography} from "@mui/material";


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
            <Grid container spacing={2} /*className={styles.teamWithName}*/ >
                {/*pokemon.map((poke) =>
                    <div className={styles.teamIn}>
                        <img height="60" src={poke.sprite_url} alt={"Photo of pokemon"} className={styles.pict}/>
                        <div className={styles.name}>{poke.name}</div>
                        <div className={styles.types} >
                            {poke.type.map(type => <img height="10" src={getPokeTypeIcon(type)} alt="PokeTypes" />)}
                        </div>
                    </div>
                )*/}

                {pokemon.map((poke) =>
                    <Grid item xs={4}>
                        <Card /*className={styles.teamIn}*/>
                            <CardContent>
                                <Typography>
                                    <img height="60" src={poke.sprite_url} alt={"Photo of pokemon"} className={styles.pict}/>
                                </Typography>
                                <Typography>
                                <div className={styles.name}>{poke.name}</div>
                                </Typography>
                                <Typography>
                                    <div className={styles.types} >
                                        {poke.type.map(type => <img height="10" src={getPokeTypeIcon(type)} alt="PokeTypes" />)}
                                    </div>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )}

            </Grid>
        </div>
    );
}
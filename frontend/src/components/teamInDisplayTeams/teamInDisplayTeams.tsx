import React, { FC } from 'react';
import styles from "./teamInDisplayTeams.module.css";
import {getPokeTypeIcon} from "../../static/typeIcons/pokeTypeIcons";
import {Card, CardContent, Grid, Typography} from "@mui/material";
import { Team } from '../../utils/Pokemon';

interface IteamProps {
    team: Team
}


export const TeamInDisplayTeams: FC<IteamProps> = ({team}) => {
    return (
        <div style={{padding: "15px 0px"}}>
            <div className={styles.teamName}> {team.name} </div>
            <Grid container spacing={2}>
                {team.pokemon.map((poke) =>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <Typography>
                                    <img height="60" src={poke.sprite_url} alt={poke.name} className={styles.pict}/>
                                </Typography>
                                <Typography>
                                <div className={styles.name}>{poke.name}</div>
                                </Typography>
                                <Typography>
                                    <div className={styles.types} >
                                        {poke.pokeTypes.map(type => <img height="10" src={getPokeTypeIcon(type)} alt="PokeTypes" />)}
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
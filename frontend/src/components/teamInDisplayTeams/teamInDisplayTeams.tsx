import React, { FC } from 'react';
import {getPokeTypeIcon} from "../../static/typeIcons/pokeTypeIcons";
import {Card, CardContent, Grid, Typography} from "@mui/material";
import { Team } from '../../utils/Pokemon';
import {makeStyles} from "@material-ui/core/styles";

interface IteamProps {
    team: Team
}


export const TeamInDisplayTeams: FC<IteamProps> = ({team}) => {

    const useStyles =  makeStyles({
        teamContainer: {
            marginBottom: "35px"
        }
    });

    const classes = useStyles();

    return (
        <div>
            <h3> {team.name} </h3>
            <Grid container spacing={2} className={classes.teamContainer}>
                {team.pokemon.map((poke, number) =>
                    <Grid item xs={6} key={number}>
                        <Card>
                            <CardContent>
                                <Typography>
                                    <img height="60" src={poke.sprite_url} alt={poke.name} />
                                </Typography>
                                <Typography>
                                    {poke.name}
                                </Typography>
                                <Typography>
                                    {poke.pokeTypes.map((type, number) => <img key={number} height="10" src={getPokeTypeIcon(type)} alt="PokeTypes" />)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )}

            </Grid>
        </div>
    );
}
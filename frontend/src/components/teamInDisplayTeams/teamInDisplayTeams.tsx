import React, { FC } from "react";
import { getPokeTypeIcon } from "../../static/typeIcons/pokeTypeIcons";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Team } from "../../utils/Pokemon";
import { makeStyles } from "@material-ui/core/styles";

interface IteamProps {
  team: Team;
  pokemonClicked: (pokemonId: number) => void;
}

export const TeamInDisplayTeams: FC<IteamProps> = ({
  team,
  pokemonClicked,
}) => {
  const useStyles = makeStyles((theme) => ({
    teamContainer: {
      marginBottom: "35px",
      padding: "20px",
      justifyContent: "center",
    },
    pokeName: {
      [theme.breakpoints.down("xs")]: {
        fontSize: "15px",
      },
    },
    pokeCard: {
      [theme.breakpoints.down("xs")]: {
        width: "230px",
      },
    },
    pokeType: {},
    pokeImage: {},
    gridContainer: {
      [theme.breakpoints.down("xs")]: {
        maxWidth: "100%",
        width: "100%",
        justifyContent: "center",
      },
    },
  }));

  const classes = useStyles();

  return (
    <div data-cy={`team-${team.name}`}>
      <h3 style={{ textAlign: "center" }}> {team.name} </h3>
      <Grid container spacing={2} className={classes.teamContainer}>
        {team.pokemon.map((poke, number) => (
          <Grid
            className={classes.gridContainer}
            item
            xs={6}
            key={number}
            sx={{ cursor: "pointer" }}
            onClick={() => pokemonClicked(poke.entry_number)}
          >
            <Card className={classes.pokeCard}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Typography>
                  <img height="70" src={poke.sprite_url} alt={poke.name} />
                </Typography>
                <Typography className={classes.pokeName}>
                  {poke.name}
                </Typography>
                <Typography>
                  {poke.pokeTypes.map((type, number) => (
                    <img
                      title={type}
                      key={number}
                      height="30"
                      src={getPokeTypeIcon(type)}
                      alt="PokeTypes"
                    />
                  ))}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

import React from "react";
import {Pokemon} from "../../utils/Pokemon";
import {Accordion, AccordionDetails, AccordionSummary, Button, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useRecoilState} from "recoil";
import {pokemonTeam} from "../../store";
import { makeStyles } from "@material-ui/core/styles";
import {getPokeTypeIcon} from "../../static/typeIcons/pokeTypeIcons";

interface pokeProps {
    pokemon: Pokemon
}

const PokemonInTeamComponent = (poke : pokeProps) => {
    const [pokemon, setPokemon] = useRecoilState(pokemonTeam)

    const removeFromTeam = () => {
        const newList: Pokemon[] = pokemon.filter(pokemon => pokemon.entry_number !== poke.pokemon.entry_number)
        try {
            setPokemon(newList)
        } catch (e) {
            console.log(e);
        }
    }

    const useStyles =  makeStyles((theme) => ({
        accDet: {
            display: "grid",
        },

        acc: {
            marginBottom: "20px",
        },

        typ: {
            width: "33%",
            flexShrink: 0,
            alignSelf: "center",
            textTransform: "capitalize",
        },

        pokeName: {
            width: "33%",
            flexShrink: 0,
            alignSelf: "center",
            textTransform: "capitalize",
            [theme.breakpoints.down("xs")]: {
                fontSize: "15px"
            }
        },

        pokeType: {

            [theme.breakpoints.down("xs")]: {
                height: "20px",
                width: "auto"
            }
        },

        pokeImage: {

            [theme.breakpoints.down("xs")]: {
                height: "55px",
                width: "auto"
            }
        },

        removeButton: {
            [theme.breakpoints.down("xs")]: {
                height: "25px",
                fontSize: "10px"
            }
        }
    }));

    const classes = useStyles();

    return (
            <Accordion className={classes.acc} data-testid="pokemon_accordion">
                <AccordionSummary  expandIcon={<ExpandMoreIcon />}>

                        <Typography className={classes.typ}>
                            <img title={poke.pokemon.name} className={classes.pokeImage} src={poke.pokemon.sprite_url} alt={`${poke.pokemon.name}`}/>
                        </Typography>
                        <Typography className={classes.pokeName}>
                            {poke.pokemon.name}
                        </Typography>
                        <Typography className={classes.typ}>
                            {poke.pokemon.pokeTypes.map(type => <img className={classes.pokeType} style={{marginRight: "10px"}} height="30" src={getPokeTypeIcon(type)} alt="PokeTypes"/>)}
                        </Typography>

                    </AccordionSummary >
                <AccordionDetails className={classes.accDet}>
                        <Button className={classes.removeButton} variant="contained" onClick={removeFromTeam} data-testid="remove_button">Remove from team</Button>
                </AccordionDetails>
            </Accordion>

    )
}

export default PokemonInTeamComponent;
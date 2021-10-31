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

    const useStyles =  makeStyles({
        accDet: {
            display: "grid"
        },
        typ: {
            width: "33%",
            flexShrink: 0,
            alignSelf: "center",
            textTransform: "capitalize"
        },
        acc: {
            marginBottom: "20px"
        }
    });

    const classes = useStyles();

    return (
            <Accordion className={classes.acc}>
                <AccordionSummary  expandIcon={<ExpandMoreIcon />}>

                        <Typography className={classes.typ}>
                            <img src={poke.pokemon.sprite_url} alt={`${poke.pokemon.name}`}/>
                        </Typography>
                        <Typography className={classes.typ}>
                            {poke.pokemon.name}
                        </Typography>
                        <Typography className={classes.typ}>
                            {poke.pokemon.pokeTypes.map(type => <img style={{marginRight: "10px"}} height="30" src={getPokeTypeIcon(type)} alt="PokeTypes"/>)}
                        </Typography>

                    </AccordionSummary >
                <AccordionDetails className={classes.accDet}>
                    <div>
                        <Button variant="contained" onClick={removeFromTeam}>Remove from team</Button>
                    </div>
                </AccordionDetails>
            </Accordion>

    )
}

export default PokemonInTeamComponent;
import {Pokemon} from "../../pages/myTeamPage/myTeam";
import {Accordion, AccordionDetails, AccordionSummary, Button, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useRecoilState} from "recoil";
import {pokemonTeam} from "../../store";
import { makeStyles } from "@material-ui/core/styles";

interface pokeProps {
    pokemon: Pokemon
}

const PokemonInTeamComponent = (poke : pokeProps) => {
    const [pokemon, setPokemon] = useRecoilState(pokemonTeam)

    const removeFromTeam = () => {
        const newList: number[] = pokemon.filter(pokeID => pokeID !== poke.pokemon.id)
        try {
            setPokemon(newList)
        } catch (e) {

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
        }
    });

    const classes = useStyles();

    return (
            <Accordion >
                <AccordionSummary  expandIcon={<ExpandMoreIcon />}>

                        <Typography className={classes.typ}>
                            <img src={poke.pokemon.sprite_url} alt={""}/>
                        </Typography>
                        <Typography className={classes.typ}>
                            {poke.pokemon.name}
                        </Typography>
                        <Typography className={classes.typ}>
                            {poke.pokemon.type}
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
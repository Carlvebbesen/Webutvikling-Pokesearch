import {Pokemon} from "../../pages/myTeamPage/myTeam";
import {Accordion, AccordionDetails, AccordionSummary, Button, Grid, Paper, styled} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from "./pokemonInTeamComponent.module.css"
import {useRecoilState} from "recoil";
import {pokemonTeam} from "../../store";

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


    return (

            <Grid item xs={6}>

                <Accordion >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}  className={styles.pokeContainer}>
                        <div className={styles.pokeDiv}>
                            <img className={styles.pokeImg} src={poke.pokemon.sprite_url}/>
                            <h3 className={styles.pokeName} >{poke.pokemon.name}</h3>
                            <p className={styles.pokeImg} >{poke.pokemon.type}</p>
                        </div>
                    </AccordionSummary >
                    <AccordionDetails>
                        <div>
                            <Button variant="contained" onClick={removeFromTeam}>Remove from team</Button>
                        </div>
                    </AccordionDetails>

                </Accordion>
            </Grid>


    )
}

export default PokemonInTeamComponent;
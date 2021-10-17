import {Pokemon} from "../../pages/myTeamPage/myTeam";
import {Accordion, AccordionDetails, AccordionSummary, Grid, Paper, styled} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from "./pokemonInTeamComponent.module.css"

interface pokeProps {
    pokemon: Pokemon
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const PokemonInTeamComponent = (poke : pokeProps) => {


    return (

            <Grid item xs={4}>

                <Accordion >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <img className={styles.pokeImg} src={poke.pokemon.sprite_url}/>
                        <h3 className={styles.pokeName} >{poke.pokemon.name}</h3>
                        <p className={styles.pokeImg} >{poke.pokemon.type}</p>
                    </AccordionSummary >
                    <AccordionDetails>
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </div>
                    </AccordionDetails>

                </Accordion>


            </Grid>


    )
}

export default PokemonInTeamComponent;
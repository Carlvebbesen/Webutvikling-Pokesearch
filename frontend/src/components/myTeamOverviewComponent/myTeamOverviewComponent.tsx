import {Pokemon} from "../../pages/myTeamPage/myTeam";
import PokemonInTeamComponent from "../pokemonInTeamComponent/pokemonInTeamComponent";
import {PokemonData} from "../../data/pokemonData";
import styles from "./myTeamOverviewComponent.module.css"
import {Grid} from "@mui/material";

interface pokeProps {
    pokemon: Pokemon[]
}

const MyTeamOverviewComponent = () => {
    const data : Pokemon[] = [...PokemonData, ...PokemonData]

    return (
        <Grid container spacing={2}>
            {data.length === 0 ?
                <p>
                    You have not chosen any pokemon for your team
                </p>
                :data.map((poke, key) =>
                <PokemonInTeamComponent pokemon={poke} key={key}/>
            )}
        </Grid>
    );

}

export default MyTeamOverviewComponent;
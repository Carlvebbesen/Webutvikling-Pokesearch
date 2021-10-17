import {Pokemon} from "../../pages/myTeamPage/myTeam";
import PokemonInTeamComponent from "../pokemonInTeamComponent/pokemonInTeamComponent";
import styles from "./myTeamOverviewComponent.module.css"
import {Button, Grid, TextField} from "@mui/material";
import {useRecoilState, useRecoilValue} from "recoil";
import {pokemonTeam, updatedPokemonTeam} from "../../store";
import {useState} from "react";


const MyTeamOverviewComponent = () => {

    const pokemon : Pokemon[] = useRecoilValue(updatedPokemonTeam);
    const [team, setTeam] = useRecoilState(pokemonTeam)
    const [myValue, setValue] = useState(0)


    const addToTeam = () => {
        const newTeam : number[] = [...team];
        newTeam.push(myValue);
        console.log(newTeam)
        setTeam(newTeam)
    }

    return (
        <Grid container spacing={2}>

            {team.length === 1 ?
                <div>
                    You have not chosen any pokemon for your team
                </div>
                :pokemon.map((poke, key) =>
                <PokemonInTeamComponent pokemon={poke} key={key}/>
            )}
            {/*
            For testing:
            <TextField id="outlined-basic" label="Outlined" variant="outlined"  onChange={(e) => setValue(Number(e.target.value))}/>
            <Button variant="contained" onClick={addToTeam}>Add to team</Button>
            */}
        </Grid>

    );

}

export default MyTeamOverviewComponent;
import {Pokemon} from "../../pages/myTeamPage/myTeam";
import PokemonInTeamComponent from "../pokemonInTeamComponent/pokemonInTeamComponent";
import styles from "./myTeamOverviewComponent.module.css"
import {Button, TextField} from "@mui/material";
import {useRecoilState, useRecoilValue} from "recoil";
import {pokemonTeam, updatedPokemonTeam} from "../../store";
import {useState} from "react";


const MyTeamOverviewComponent = () => {

    const pokemon : Pokemon[] = useRecoilValue(updatedPokemonTeam);
    const [team, setTeam] = useRecoilState(pokemonTeam)
    const [myValue, setValue] = useState(0)


    const addToTeam = () => {
        const newTeam : number[] = [...team];
        if (!isNaN(myValue)) {
            newTeam.push(myValue);
        }
        setTeam(newTeam)
    }

    return (
        <div className={styles.MyTeamOverview}>
            {team.length === 0 ?
                <div>
                    You have not chosen any pokemon for your team
                </div>
                :pokemon.map((poke, key) =>
                <PokemonInTeamComponent pokemon={poke} key={key}/>
            )}
            <TextField id="outlined-basic" variant="outlined"
                   onChange={(e) => setValue(Number(e.target.value))}/>
            <Button variant="contained" onClick={addToTeam}>Add to team</Button>
        </div>

    );

}

export default MyTeamOverviewComponent;
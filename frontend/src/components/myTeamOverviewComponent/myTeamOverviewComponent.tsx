import PokemonInTeamComponent from "../pokemonInTeamComponent/pokemonInTeamComponent";
import styles from "./myTeamOverviewComponent.module.css"
import {Button, TextField} from "@mui/material";
import {useRecoilState, useRecoilValue} from "recoil";
import {pokemonTeam} from "../../store";
import {useState} from "react";

const MyTeamOverviewComponent = () => {

    const [team] = useRecoilState(pokemonTeam)
    const [name, setName] = useState<string>()

    const saveTeam = () => {
        //TODO: lagre i databasen med name som navn
    }

    return (
        <div className={styles.MyTeamOverview}>
            {team.length === 0 ?
                <div>
                    You have not chosen any pokemon for your team
                </div>
                :team.map((poke, key) =>
                <PokemonInTeamComponent pokemon={poke} key={key}/>
            )}
            <TextField id="outlined-basic" variant="outlined"
                       onChange={(e) => setName(String(e.target.value))}/>
            <Button variant="contained" onClick={saveTeam}>Save team</Button>
        </div>

    );

}

export default MyTeamOverviewComponent;
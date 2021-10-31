import PokemonInTeamComponent from "../pokemonInTeamComponent/pokemonInTeamComponent";
import styles from "./myTeamOverviewComponent.module.css"
import {Button, TextField} from "@mui/material";
import {useRecoilState} from "recoil";
import {pokemonTeam} from "../../store";
import {useState} from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TEAM } from "../../queries";

const MyTeamOverviewComponent = () => {

    const [team, setTeam] = useRecoilState(pokemonTeam)
    const [name, setName] = useState<string>("");
    const [mutateFunction] = useMutation(CREATE_TEAM);
    const saveTeam = () => {
        mutateFunction({variables: {input:{
            name: name,
            pokemons: team.map(pokemon => pokemon.entry_number),
        }}});
    setName("");
    setTeam([]);
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
            <TextField value={name} 
            disabled={team.length ===0} 
            id="outlined-basic" variant="outlined" label="A unique Team Name"
                       onChange={(e) => setName(String(e.target.value))}/>
            <Button 
            disabled={team.length===0|| name.trim() === ""} 
            variant="contained" onClick={saveTeam}>Save team</Button>
        </div>

    );

}

export default MyTeamOverviewComponent;
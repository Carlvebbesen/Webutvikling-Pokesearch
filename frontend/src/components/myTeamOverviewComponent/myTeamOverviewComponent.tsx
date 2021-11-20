import PokemonInTeamComponent from "../pokemonInTeamComponent/pokemonInTeamComponent";
import styles from "./myTeamOverviewComponent.module.css"
import {Button, CircularProgress, TextField} from "@mui/material";
import {useRecoilState} from "recoil";
import {pokemonTeam} from "../../store";
import {useState} from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TEAM, GET_ALL_TEAMS } from "../../queries";
import { toast } from "react-toastify";

const MyTeamOverviewComponent = () => {

    const [team, setTeam] = useRecoilState(pokemonTeam)
    const [name, setName] = useState<string>("");
    const [mutateFunction, { loading}] = useMutation(CREATE_TEAM,{
        refetchQueries: [
          GET_ALL_TEAMS,
          'GetAllTeams', // Query name
        ],});
    const saveTeam = async () => {
        try {
            await mutateFunction({variables: {input:{
                name: name,
                pokemons: team.map(pokemon => pokemon.entry_number),
            }}});
                toast.success("The team was added to the database!", {autoClose: 2000})
                setName("");
                setTeam([]);
        }
        
    catch (error) {
            toast.error("A team with the given name already exist", {autoClose: 2000})
            setName("");
        }
    }

    return (
        <div className={styles.MyTeamOverview}>
            {loading ? <CircularProgress/> :team.length === 0 ?
                <div>
                    <div className={styles.emptyTeam}>
                        You have not chosen any pokemon for your team. Please go to Database and select some you like.
                    </div>
                    <div className={styles.message}>
                        Maybe you can get some inspiration from the teams below
                    </div>
                </div>

                :
                <div>
                    {team.map((poke, key) =>
                        <PokemonInTeamComponent pokemon={poke} key={key}/>
                )}
                <TextField
                    data-cy="team-name-input"
                    data-testid="team-name-input"
                    value={name}
                    disabled={team.length === 0}
                    id="outlined-basic"
                    variant="outlined"
                    label="A unique Team Name"
                    onChange={(e) => setName(String(e.target.value))}/>
                <Button
                    data-cy="team-submit"
                    data-testid="team-submit"
                    disabled={team.length === 0 || name.trim() === ""}
                    variant="contained"
                    onClick={saveTeam}>
                        Save team
                </Button>
                </div>
            }

        </div>

    );

}

export default MyTeamOverviewComponent;
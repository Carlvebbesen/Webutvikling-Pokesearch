import React, {FC} from "react";
import SwapHorizontalCircleOutlinedIcon from "@mui/icons-material/SwapHorizontalCircleOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import style from "./Team.module.css"
import {Pokemon} from "../../utils/Pokemon";
import {atom, useRecoilState} from "recoil";

interface iTeamMember {
    TeamMember: Pokemon | null
    handleSwap: Function
    handleAdd: Function
    index: number
}

const TeamMember: FC<iTeamMember> = (props) => {


    if (props.TeamMember !== null) {
        return (
            <div className={style.teamMember}>
                <img src={props.TeamMember.sprite_url}/>
                <p>{props.TeamMember.name}</p>
                <SwapHorizontalCircleOutlinedIcon className={style.removeButton} onClick={() => props.handleSwap(props.index)}/>
            </div>
        )
    }
    return (
        <div className={style.emptyTeamMember}>
            <AddCircleOutlineIcon className={style.addButton} onClick={() => props.handleAdd()}/>
        </div>
    )
}


interface iTeam {
    currentPokemon: Pokemon
}

const Team: FC<iTeam> = (props) => {
    console.log(props.currentPokemon as unknown as string)
    const pokemonTeam = atom<Pokemon[]>({
        key: "pokemonTeam",
        default: []
    });

    const [pokemons, setPokemons] = useRecoilState(pokemonTeam)
    const team = pokemons.map((pokemon,index) => <li><TeamMember TeamMember={pokemon}
                                                         handleAdd={handleAdd} handleSwap={handleSwap} index={index}/></li>)

    function handleSwap(remove_index: number) {
        let copy = pokemons
        if (remove_index > -1) {
            setPokemons([...copy.slice(0, remove_index), props.currentPokemon, ...copy.slice(remove_index+1)])
        }
    }

    function handleAdd() {
        setPokemons(prev => ([...prev, props.currentPokemon]))
    }


    if (team.length < 6) {
        team.push(<li><TeamMember TeamMember={null} handleAdd={handleAdd}
                                  handleSwap={handleSwap} index={team.length}/></li>)
    }
    return (
        <div className={style.team}>
            <h4>Current Team</h4>
            <ul className={style.teamList}>
                {team}
            </ul>
        </div>
    )
}

export default Team
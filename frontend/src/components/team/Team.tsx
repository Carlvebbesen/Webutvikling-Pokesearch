import React, {FC} from "react";
import SwapHorizontalCircleOutlinedIcon from "@mui/icons-material/SwapHorizontalCircleOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import style from "./Team.module.css"

interface iTeamMember {
    teamId: number
    pokemonid: number
}

const TeamMember: FC<iTeamMember> = (props) => {
    function handleSwap() {
        alert("remove " + props.teamId + " and add " + props.pokemonid)
    }

    function handleAdd() {
        alert("add " + props.pokemonid)
    }


    if (props.teamId !== 0) {
        return (
            <div className={style.teamMember}>
                <p>{props.teamId}</p>
                <SwapHorizontalCircleOutlinedIcon className={style.removeButton} onClick={handleSwap}/>
            </div>
        )
    }
    return (
        <div className={style.emptyTeamMember}>
            <AddCircleOutlineIcon className={style.addButton} onClick={handleAdd}/>
        </div>
    )
}


interface iTeam {
    members: number[]
    pokemonid: number
}

const Team: FC<iTeam> = (props) => {
    const team = props.members.map(id => <li><TeamMember teamId={id} pokemonid={props.pokemonid}/></li>)
    while (team.length < 6) {
        team.push(<li><TeamMember teamId={0} pokemonid={props.pokemonid}/></li>)
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
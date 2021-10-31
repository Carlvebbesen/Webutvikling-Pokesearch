import React from "react"
import style from "./Navbar.module.css"
import StorageIcon from '@mui/icons-material/Storage';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import {useHistory} from "react-router";



const Navbar = ()=>{
    let history=useHistory()

    return(
        <div className={style.navbar}>
            <div className={style.icon} onClick={()=>history.push("/prosjekt3/")}>
                <StorageIcon/>
                <p className={style.text}>Database</p>
            </div>
            <div className={style.icon} onClick={()=>history.push("/prosjekt3/my-team")}>
                <GroupWorkIcon/>
                <p className={style.text}>Pokémon Teams</p>
            </div>
        </div>
    )
}

export default Navbar
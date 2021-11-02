import React, {useState} from "react"
import style from "./Navbar.module.css"
import StorageIcon from '@mui/icons-material/Storage';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import {useHistory} from "react-router";



const Navbar = ()=>{
    let history=useHistory();

    const [overviewStyle, setOverviewStyle] = useState(style.chosenIcon);
    const [teamStyle, setTeamStyle] = useState(style.icon);

    const changeView = (path : string) => {
        history.push(path);
        const a = teamStyle;
        setTeamStyle(overviewStyle);
        setOverviewStyle(a);
    };

    return(
            <div className={style.navbar}>
                <div className={overviewStyle} onClick={() => changeView("/prosjekt3/")}>
                    <StorageIcon/>
                    <p className={style.text}>Database</p>
                </div>
                <div className={teamStyle} onClick={() => changeView("/prosjekt3/my-team")}>
                    <GroupWorkIcon/>
                    <p className={style.text}>Pokemon Teams</p>
                </div>
            </div>

    )
}

export default Navbar
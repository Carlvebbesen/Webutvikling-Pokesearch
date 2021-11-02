import React, {useState} from "react"
import style from "./Navbar.module.css"
import StorageIcon from '@mui/icons-material/Storage';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import {useHistory} from "react-router";
import { useLocation } from 'react-router-dom'

const Navbar = ()=>{
    let history=useHistory();
    const location = useLocation();

    const [overviewStyle, setOverviewStyle] = useState(style.chosenIcon);
    const [teamStyle, setTeamStyle] = useState(style.icon);

    const changeView = (path : string) => {

        if (path !== location.pathname) {
            history.push(path);
            const a = teamStyle;
            setTeamStyle(overviewStyle);
            setOverviewStyle(a);
        }

    };

    return(
            <div className={style.navbar}>
                <div data-cy="nav-database" className={overviewStyle} onClick={() => changeView("/prosjekt3/")}>
                    <StorageIcon/>
                    <p className={style.text}>Database</p>
                </div>
                <div data-cy="nav-teams" className={teamStyle} onClick={() => changeView("/prosjekt3/my-team")}>
                    <GroupWorkIcon/>
                    <p className={style.text}>Pokemon Teams</p>
                </div>
            </div>

    )
}

export default Navbar
import React, {useState} from "react"
import style from "./Navbar.module.css"
import StorageIcon from '@mui/icons-material/Storage';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import {useHistory} from "react-router";
import { useLocation } from 'react-router-dom'

const Navbar = () => {
    let history = useHistory();
    const location = useLocation();

    let overview = style.chosenIcon;
    let team = style.icon

    if (location.pathname === "/prosjekt3/my-team") {
        [overview, team] = [team, overview];
    }

    const [overviewStyle, setOverviewStyle] = useState(overview);
    const [teamStyle, setTeamStyle] = useState(team);

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
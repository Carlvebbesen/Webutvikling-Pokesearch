import React, {FC} from "react";

import style from "./backgroundPopUp.module.css"

interface IBackgroundPopUp {
    show: boolean
    clicked: Function
}

const BackgroundPopUp: FC<IBackgroundPopUp> = (props) => (
    props.show ? <div className={style.Backdrop} onClick={() => props.clicked()}>

    </div> : null
);

export default BackgroundPopUp;





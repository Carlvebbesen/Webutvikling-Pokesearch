import React, {FC} from "react";

import style from "./backdrop.module.css"

interface iBackdrop {
    show: boolean
    clicked: Function
}

const backdrop: FC<iBackdrop> = (props) => (
    props.show ? <div className={style.Backdrop} onClick={() => props.clicked()}>

    </div> : null
);

export default backdrop;
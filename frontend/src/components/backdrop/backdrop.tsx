import React, {FC} from "react";

import style from "./backdrop.module.css"

interface iBackdrop {
    show: boolean
    clicked: Function
}

const Backdrop: FC<iBackdrop> = ({show, clicked}) => (
    show ? <div className={style.Backdrop} onClick={() => clicked()}/>: null
);

export default Backdrop;
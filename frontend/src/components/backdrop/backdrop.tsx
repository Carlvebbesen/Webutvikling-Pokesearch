
import React from "react";

import style from "./backdrop.module.css";

interface iBackdrop {
    clicked: ()=> void,
    show: boolean,
}

const backdrop =(props: iBackdrop)=>(
    props.show ? <div className={style.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;
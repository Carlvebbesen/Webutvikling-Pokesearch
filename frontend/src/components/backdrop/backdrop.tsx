import style from "./backdrop.module.css";
import React from "react";

interface Ibackdrop {
    clicked: ()=> void;
    show: boolean;
}
const Backdrop: React.FC<Ibackdrop> =({clicked, show})=>(
    show ? <div className={style.Backdrop} onClick={clicked}></div> : null
);

export default Backdrop;

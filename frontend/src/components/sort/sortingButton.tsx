import React, { FC, useState } from "react";
import style from "./sortingButton.module.css";
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import SortIcon from '@mui/icons-material/Sort';

interface iSortingButton {
    name: string,
    label: string,
    currentSort: string | undefined,
    sort: (name: string, decending: boolean) => void
};
 const SortingButton: FC<iSortingButton> = ({name, label, currentSort, sort}) => {
    const [decending, setdecending] = useState<boolean>(false);
    const sortBy =()=>{
        const newState = !decending;
        setdecending(newState);
        sort(name as string, newState);
    }
    return (
        <button data-testid={name} data-cy={name} className={style.sortingButton} onClick={sortBy}>
            <p>{label}</p>
            {currentSort !== name && (currentSort !== undefined || name !== "pokemonId")
                ? <SortIcon/> :
                decending ? <ArrowUpwardOutlinedIcon/> : <ArrowDownwardOutlinedIcon/>}
        </button>
    )
}

export default SortingButton;

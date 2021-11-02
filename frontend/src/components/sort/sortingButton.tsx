import React, { FC, useState } from "react";
import style from "./sortingButton.module.css";
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import FilterAltIcon from  '@mui/icons-material/FilterAlt';

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
        <button data-cy={name} className={style.sortingButton} onClick={sortBy}>
            <p>{label}</p>
            {currentSort !== name && (currentSort !== undefined || name !== "pokemonId")
                ? <FilterAltIcon/> :
                decending ? <ArrowUpwardOutlinedIcon/> : <ArrowDownwardOutlinedIcon/>}
        </button>
    )
}

export default SortingButton;

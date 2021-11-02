import { TableRow , TableCell} from '@mui/material';
import React from 'react';
import SortingButton from './sortingButton';
import style from "./../tableListRow/tableListRow.module.css";

interface SortingButtonsListProps {
    sortByValue: (name:string, decending: boolean) => void
    activeButton: string | undefined,
}

const SortingButtonsList: React.FC<SortingButtonsListProps> = ({sortByValue, activeButton }) => {
    
    const sortValues = ["hp",
        "attack",
        "defense",
        "special-attack",
        "special-defense",
        "speed",
        "total"]
        return (
        <TableRow>
            <TableCell>
                <SortingButton name={"pokemonId"} currentSort={activeButton} sort={sortByValue}/>
            </TableCell>
            <TableCell/>
            <TableCell/>
            {
            sortValues.map((name) => 
            <TableCell className={style.statList} key={name}>
                <SortingButton name={name} currentSort={activeButton} sort={sortByValue}/>
            </TableCell>          
                )}
            </TableRow>
    );
};

export default SortingButtonsList;
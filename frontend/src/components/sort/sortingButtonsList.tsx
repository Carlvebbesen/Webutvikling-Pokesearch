import { TableRow , TableCell} from '@mui/material';
import React from 'react';
import SortingButton from './sortingButton';
import style from "./../tableListRow/tableListRow.module.css";

interface SortingButtonsListProps {
    sortByValue: (name: string, decending: boolean) => void
    activeButton: string | undefined,
}

const SortingButtonsList: React.FC<SortingButtonsListProps> = ({sortByValue, activeButton }) => {

    const sortOptions = [
        { name: "hp", label: "Hp"},
        { name: "attack", label: "Attack"},
        { name: "defense", label: "Defense"},
        { name: "special_attack", label: "Sp. Atk"},
        { name: "special_defense", label: "Sp. Def"},
        { name: "speed", label: "Speed"},
        { name: "total", label: "Total"},
    ]
        return (
        <TableRow>
            <TableCell>
                <SortingButton name={"pokemonId"} label={"PokemonId"} currentSort={activeButton} sort={sortByValue}/>
            </TableCell>
            <TableCell/>
            <TableCell/>
            {
            sortOptions.map((option) => 
            <TableCell className={style.statList} key={option.name}>
                <SortingButton name={option.name} label={option.label} currentSort={activeButton} sort={sortByValue}/>
            </TableCell>          
                )}
            </TableRow>
    );
};

export default SortingButtonsList;
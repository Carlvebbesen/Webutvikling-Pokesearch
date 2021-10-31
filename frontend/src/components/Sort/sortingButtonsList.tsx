import { TableRow , TableCell} from '@mui/material';
import React from 'react';
import { useWindowDimensions } from '../../utils/methods';
import SortingButton from './sortingButton';

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
        const width = useWindowDimensions().width;
    return (
        <TableRow>
            <TableCell>
                <SortingButton name={"pokemonId"} currentSort={activeButton} sort={sortByValue}/>
            </TableCell>
            {width > 600 ?sortValues.map((name) => 
            <TableCell>
                <SortingButton name={name} currentSort={activeButton} sort={sortByValue}/>
            </TableCell>          
                ): null}
            </TableRow>
    );
};

export default SortingButtonsList;
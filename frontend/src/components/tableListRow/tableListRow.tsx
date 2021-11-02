import {capitalize, TableCell, TableRow} from '@mui/material';
import React from 'react';
import {getPokeTypeIcon} from '../../static/typeIcons/pokeTypeIcons';
import {Pokemon} from '../../utils/Pokemon';
import style from "./tableListRow.module.css";

interface TableListRowProps {
    pokemon: Pokemon;
    setPopUpShow: Function;
}

const TableListRow: React.FC<TableListRowProps> = ({pokemon, setPopUpShow}) => {
    return (
        <TableRow data-cy={pokemon.name} onClick={() => setPopUpShow(pokemon.entry_number)} hover={true} key={pokemon.entry_number}>
            <TableCell padding="none" align="center" key={pokemon.entry_number + 10000}>
                <img src={pokemon.sprite_url} alt="pokemon"/>
            </TableCell>
            <TableCell data-cy="pokemon-name"  padding={"none"} align="center" key={pokemon.entry_number + 20000}>
                <p style={{width: "100px"}}>{capitalize(pokemon.name)}</p>
            </TableCell>
            <TableCell data-cy="type-container" padding={"none"} align="center">
                {pokemon.pokeTypes.map(type => <img key={`${type}${pokemon.entry_number}`} style={{marginRight: "10px"}} height="30"
                                                    src={getPokeTypeIcon(type)} alt={type}/>)}
            </TableCell>
            {Object.values(pokemon.stats).slice(1)
                .map((value, index) => <TableCell data-cy={`stat_${index}`} className={style.statList}  padding={"none"} align={"center"}  key={index}>{value === null ? '-' : value}</TableCell>)}
        </TableRow>
    )
};

export default TableListRow;
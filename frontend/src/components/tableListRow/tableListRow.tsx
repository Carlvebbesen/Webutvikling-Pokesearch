import {capitalize, TableCell, TableRow} from '@mui/material';
import React from 'react';
import {getPokeTypeIcon} from '../../static/typeIcons/pokeTypeIcons';
import {Pokemon} from '../../utils/Pokemon';
import style from "./tableListRow.module.css";
import {makeStyles} from "@material-ui/core/styles";

interface TableListRowProps {
    pokemon: Pokemon;
    setPopUpShow: Function;
}

const TableListRow: React.FC<TableListRowProps> = ({pokemon, setPopUpShow}) => {
    const useStyles =  makeStyles((theme) => ({
        tableRow: {
            hover: {
                cursor: "pointer"
            }
        },

    }));

    const classes = useStyles();

    return (
        
        <TableRow className={classes.tableRow} onClick={() => setPopUpShow(pokemon.entry_number)} hover={true} key={pokemon.entry_number}>
            <TableCell padding="none" align="center" key={pokemon.entry_number + 10000}>
                <img src={pokemon.sprite_url} alt="pokemon"/>
            </TableCell>
            <TableCell padding={"none"} align="center" key={pokemon.entry_number + 20000}>
                <p style={{width: "100px"}}>{capitalize(pokemon.name)}</p>
            </TableCell>
            <TableCell padding={"none"} align="center">
                {pokemon.pokeTypes.map(type => <img key={`${type}${pokemon.entry_number}`} style={{marginRight: "10px"}} height="30"
                                                    src={getPokeTypeIcon(type)} alt={type}/>)}
            </TableCell>
            {Object.values(pokemon.stats).slice(1)
                .map((value, index) => <TableCell className={style.statList}  padding={"none"} align={"center"}  key={index}>{value === null ? '-' : value}</TableCell>)}
        </TableRow>
    )
};

export default TableListRow;
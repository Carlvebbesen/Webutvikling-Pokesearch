import {Pokemon} from "../../utils/Pokemon";
import React, {FC, useEffect, useState} from "react";
import Rating from "@mui/material/Rating";
import Team from "../team/Team";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {capitalize} from "@mui/material";
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {useWindowDimensions} from "../../utils/methods";
import style from './SimpleTable.module.css';
import { FilteredPokemon } from "../../queries";

const teamMembers = [1, 2, 3, 4]

interface iSortingButton {
    id: number
    name: string,
    hide: boolean,
    decending: boolean,
    onClick: Function
};

const SortingButton: FC<iSortingButton> = (props) => {

    useEffect(() => { //TODO: delete after solve bug
        console.log(props.id + ": decending changed to " + props.decending)
    }, [props.decending])

    const handleClick = () => {
        props.onClick(props.id)
    }

    return (
        <button className={style.sortingButton} onClick={handleClick}>
            <p>{props.name}</p>
            {props.hide
                ? <FilterAltIcon/> :
                props.decending ? <ArrowUpwardOutlinedIcon/> : <ArrowDownwardOutlinedIcon/>}
        </button>
    )
}

interface iDetails extends Pokemon {
    setRating: Function;
    getRating: Function;
}


const Details: FC<iDetails> = (props) => {
    return (
        <div className={style.outerWrapper}>
            <h1>{capitalize(props.name)}</h1>
            <div className={style.wrapper}>
                <div className={style.detailsDiv}>
                    <img src={props.sprite_url} className={style.bigpic} alt="pokemon"/>
                </div>
                <div className={style.detailsDiv}>
                    <p>type: {props.type}</p>
                    <p>number: {props.id}</p>
                    <p>weight: {props.weight}</p>
                </div>
                <div className={style.detailsDiv}>
                    <div>
                        <p>average rating of {props.number_of_ratings} people</p>
                        <Rating name="read-only" defaultValue={0} precision={0.1} value={props.rating} readOnly/>
                    </div>
                    <p>Used by: {props.usage_percentage * 100}% of teams</p>
                    <div>
                        <p>your rating</p>
                        <Rating
                            name="simple-controlled"
                            value={props.getRating(props.id)}
                            precision={0.5}
                            onChange={(event, newValue) => {
                                props.setRating(props.id, newValue)
                            }}
                        />
                    </div>
                </div>
                <div className={style.detailsDiv}>
                    <Team members={teamMembers} pokemonid={props.id}/>
                </div>
            </div>
        </div>
    )
}

interface iSimpleTable {
    data: FilteredPokemon
}

const SimpleTable: FC<iSimpleTable> = (props) => {
    const { width} = useWindowDimensions();
    const handleSort = (id: number) => {
        console.log(tableHeader)
        setTableHeader(prev => prev.map(a => {
            if (a.id === id) {
                console.log("first", a.id, a.hide, a.decending)
                if (a.hide) {
                    a.hide = false
                } else {
                    a.decending = !a.decending //TODO: noe galt her
                }
                console.log("end", a.id, a.hide, a.decending)
            } else {
                a.hide = true
            }
            return a
        }))
    }

    const [tableHeader, setTableHeader] = useState<iSortingButton[]>(["Pokemon ID", "HP", "Attack", "Defence", "Sp. Atk", "Sp. Def", "Speed", "Total"]
        .map((name, index) => {
            const button: iSortingButton = {
                decending: true, hide: true, id: index, name: name, onClick: handleSort
            }
            return button
        }))

    return (
        <div>
            <p>hei, width = {width}</p>
            <Paper className={style.root}>
                <Table stickyHeader className={style.table} aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox"/>

                            {(width>600?tableHeader:tableHeader.slice(0,1)).map(header => <TableCell align="right">
                                <SortingButton id={header.id} name={header.name} hide={header.hide}
                                               decending={header.decending} onClick={header.onClick}
                                /></TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableHead>
                        {props.data.pokemons.map(pokemon => (
                            <TableCell component="th" scope="row">
                                        <img src={pokemon.sprite_url} alt="pokemon"/>{capitalize(pokemon.name)}
                                    </TableCell>
                            ))
                        }
                        </TableHead>
                    </TableBody>
                </Table>
                <TablePagination //TODO: https://mui.com/api/table-pagination/
                    rowsPerPageOptions={[5, 10, 15]}
                    count={props.data.count}
                    page={1}
                    rowsPerPage={15}
                    onPageChange={()=> {}}
                    onRowsPerPageChange={()=>{}}
                />
            </Paper>
        </div>
    )
        ;
}

export default SimpleTable